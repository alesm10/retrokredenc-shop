import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod'
import * as z from 'zod/v4'
import { overAdmina } from '@/lib/overeni'

// Návrh názvu a popisu produktu z fotek. Claude navrhuje, Verča potvrzuje —
// nic se neukládá, jen se předvyplní formulář v administraci.

const MAX_FOTEK = 4
const KATEGORIE = ['hrnky', 'talire', 'vazy', 'sady', 'dekorace', 'jine'] as const

const Navrh = z.object({
  nazev: z.string().describe('Název produktu: co to je, výrobce nebo místo výroby, dekor'),
  popis: z.string().describe('Popis pro e-shop, 2–4 věty, česky, střízlivě. ⛔ Nesmí obsahovat slovo „střep" ani hádaný materiál (porcelán/keramika/kamenina), když není doložený.'),
  kategorie: z.enum(KATEGORIE),
  rok: z.string().describe('Období výroby jen když je doložené (značka, etiketa, dekor s jasným datem), ve tvaru "70. léta", "1960–1970" nebo "kolem 1950"; jinak prázdný řetězec — žádné „neuvedeno"'),
  overit: z.string().describe('Co má prodávající před uložením ověřit, česky, jedna až dvě věty'),
})

// Dvě pravidla, která model porušoval i přes výslovný zákaz v zadání
// (změřeno 26. 10. 2026, dva pokusy za sebou): slovo „střep" a hádání
// materiálu. Když se objeví, řekne si server jednou o opravu.
const MATERIALY = ['porcelán', 'keramick', 'keramika', 'kamenin']

function vady(popis: string, poznamka: string): string[] {
  const t = popis.toLowerCase()
  const zPoznamky = poznamka.toLowerCase()
  const n: string[] = []
  if (t.includes('střep')) n.push('použil slovo „střep"')
  for (const m of MATERIALY) {
    if (t.includes(m) && !zPoznamky.includes(m.slice(0, 6))) {
      n.push(`uvedl materiál („${m}…"), který prodávající nepotvrdila`)
      break
    }
  }
  return n
}

const ZADANI = `Jsi zkušený znalec československého porcelánu a skla z let 1950–1989 a píšeš
nabídky pro malý rodinný e-shop Retro Kredenc (retrokredenc.cz).

Z fotek předmětu navrhni název, popis, kategorii a období výroby.

Název: typ předmětu + výrobce nebo místo výroby + dekor či barva, tak jak by to
hledal sběratel (např. „Terina Haas & Czjzek Horní Slavkov, kobaltový dekor").

Popis: **2–4 věty** střízlivou češtinou, jak mluví prodejce, ne katalog.
Co to je, výrobce a značka, dekor, stav viditelný na fotkách. Použij slova,
která lidé opravdu hledají (československý porcelán, retro, jméno výrobce,
název dekoru), ale nepřeplňuj text klíčovými slovy.

Pravidla:
- Výrobce, značku a období uváděj jen tehdy, když je vidíš (typicky značka na
  dně) nebo si jimi jsi jistý. Když ne, v popisu je neuváděj a napiš to do
  „overit". Chybný údaj sběratele odradí víc než chybějící.
- Nevymýšlej rozměry, počet kusů ani stav, který na fotkách není vidět.
- Poznámka prodávající jsou fakta — ona předmět drží v ruce. Co v ní stojí
  (materiál, broušené/lisované, výrobce, rozměry, stav), převezmi a nikdy to
  nepřepisuj ani nezpochybňuj; když to podle fotek nesedí, napiš to do „overit".
- Název i popis si nesmí odporovat.
- **Dekor pojmenuj krátce** — „dekor lesní jahody", „modrý dekor se zajícem",
  „kobaltová cibulák". ⛔ Nerozepisuj jednotlivé prvky ani barvy do výčtu
  („bílé kvítky, zelené listy a jedna červená jahoda…") a nepiš květnatě
  („ručně působícím dekorem kvetoucího jahodníku").
  ⛔ Slovo **„střep" nepoužívej vůbec** — je to odborný pojem, ne řeč nabídky;
  napiš prostě „bílý hrnek" nebo barvu vynech. Prodávající tyhle věty maže.
- ⛔ **Materiál nehádej.** Porcelán, keramika, kamenina a sklo se na fotce
  pletou. Když to není jisté ze značky nebo z poznámky prodávající, napiš
  neutrálně („hrnek", „džbán") a dotaz na materiál dej do „overit".
- **Nejvýš jedna věta o tom, k čemu se to hodí** — a jen když řekne něco
  navíc. Řetězce typu „hodí se na polévku, kávu i jako dekorace do kredence"
  vynech úplně; radši žádná taková věta než vycpávka.
- **Hlídej překlepy, mezery a diakritiku** — text jde rovnou na web. Po sobě
  zkontroluj mezeru mezi slovy („Hrnky zdobí", ne „Hrnkyzdobí") a česká
  slova piš správně („kazeta", ne „kaseta"; „na horním okraji", ne „hornim").
- Kategorie: hrnky, talire, vazy, sady, dekorace, jine.`

export async function POST(request: NextRequest) {
  const zamitnuto = await overAdmina(request)
  if (zamitnuto) return zamitnuto

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'AI není nastavená (chybí klíč na serveru)' }, { status: 503 })
  }

  const { fotky, poznamka } = await request.json() as {
    fotky?: string[]
    poznamka?: string
  }
  const obrazky = (fotky ?? [])
    .filter((f) => typeof f === 'string' && f.length > 0)
    .slice(0, MAX_FOTEK)
  if (obrazky.length === 0) {
    return NextResponse.json({ error: 'Nejdřív vyberte fotky' }, { status: 400 })
  }

  const zprava = [
    ...obrazky.map((data) => ({
      type: 'image' as const,
      source: { type: 'base64' as const, media_type: 'image/jpeg' as const, data },
    })),
    {
      type: 'text' as const,
      text: poznamka?.trim()
        ? `Poznámka prodávající: ${poznamka.trim()}`
        : 'Prodávající nic nepřipsala.',
    },
  ]

  const client = new Anthropic()
  try {
    const odpoved = await client.beta.messages.parse({
      model: 'claude-opus-5',
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: ZADANI,
      messages: [{ role: 'user', content: zprava }],
      output_config: { format: betaZodOutputFormat(Navrh) },
    })

    if (odpoved.stop_reason === 'refusal' || !odpoved.parsed_output) {
      return NextResponse.json({ error: 'AI návrh nevytvořila, vyplňte prosím ručně' }, { status: 502 })
    }

    const nalezene = vady(odpoved.parsed_output.popis, poznamka ?? '')
    if (nalezene.length === 0) return NextResponse.json(odpoved.parsed_output)

    // Jeden pokus o opravu — víc ne, stálo by to peníze a čas Verči
    const oprava = await client.beta.messages.parse({
      model: 'claude-opus-5',
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: ZADANI,
      messages: [
        { role: 'user', content: zprava },
        { role: 'assistant', content: JSON.stringify(odpoved.parsed_output) },
        {
          role: 'user',
          content: `Tenhle návrh porušuje pravidla: ${nalezene.join('; ')}. `
            + 'Přepiš popis bez toho — materiál neuváděj vůbec, pokud ho prodávající '
            + 'nenapsala nebo není na značce, a slovo „střep" nepoužívej. '
            + 'Ostatní nech beze změny.',
        },
      ],
      output_config: { format: betaZodOutputFormat(Navrh) },
    })

    if (oprava.stop_reason === 'refusal' || !oprava.parsed_output) {
      return NextResponse.json(odpoved.parsed_output)
    }
    return NextResponse.json(oprava.parsed_output)
  } catch (e) {
    if (e instanceof Anthropic.AuthenticationError) {
      console.error('Popis AI: neplatný klíč')
      return NextResponse.json({ error: 'AI není správně nastavená (neplatný klíč)' }, { status: 503 })
    }
    if (e instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: 'AI je přetížená, zkuste to za chvíli' }, { status: 503 })
    }
    if (e instanceof Anthropic.APIError) {
      console.error('Popis AI:', e.status, e.message)
      return NextResponse.json({ error: 'AI teď nejde použít, vyplňte prosím ručně' }, { status: 502 })
    }
    throw e
  }
}
