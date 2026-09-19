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
  popis: z.string().describe('Popis pro e-shop, 3–5 vět, česky'),
  kategorie: z.enum(KATEGORIE),
  rok: z.string().describe('Období výroby jen když je doložené (značka, etiketa, dekor s jasným datem), ve tvaru "70. léta", "1960–1970" nebo "kolem 1950"; jinak prázdný řetězec — žádné „neuvedeno"'),
  overit: z.string().describe('Co má prodávající před uložením ověřit, česky, jedna až dvě věty'),
})

const ZADANI = `Jsi zkušený znalec československého porcelánu a skla z let 1950–1989 a píšeš
nabídky pro malý rodinný e-shop Retro Kredenc (retrokredenc.cz).

Z fotek předmětu navrhni název, popis, kategorii a období výroby.

Název: typ předmětu + výrobce nebo místo výroby + dekor či barva, tak jak by to
hledal sběratel (např. „Terina Haas & Czjzek Horní Slavkov, kobaltový dekor").

Popis: 3–5 vět přirozenou češtinou. Co to je, výrobce a značka, období, dekor
a barvy, stav viditelný na fotkách, k čemu se hodí. Použij slova, která lidé
opravdu hledají (československý porcelán, retro, jméno výrobce, název dekoru),
ale nepřeplňuj text klíčovými slovy.

Pravidla:
- Výrobce, značku a období uváděj jen tehdy, když je vidíš (typicky značka na
  dně) nebo si jimi jsi jistý. Když ne, v popisu je neuváděj a napiš to do
  „overit". Chybný údaj sběratele odradí víc než chybějící.
- Nevymýšlej rozměry, počet kusů ani stav, který na fotkách není vidět.
- Poznámka prodávající jsou fakta — ona předmět drží v ruce. Co v ní stojí
  (materiál, broušené/lisované, výrobce, rozměry, stav), převezmi a nikdy to
  nepřepisuj ani nezpochybňuj; když to podle fotek nesedí, napiš to do „overit".
- Název i popis si nesmí odporovat.
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

  const client = new Anthropic()
  try {
    const odpoved = await client.beta.messages.parse({
      model: 'claude-opus-5',
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: ZADANI,
      messages: [{
        role: 'user',
        content: [
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
        ],
      }],
      output_config: { format: betaZodOutputFormat(Navrh) },
    })

    if (odpoved.stop_reason === 'refusal' || !odpoved.parsed_output) {
      return NextResponse.json({ error: 'AI návrh nevytvořila, vyplňte prosím ručně' }, { status: 502 })
    }
    return NextResponse.json(odpoved.parsed_output)
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
