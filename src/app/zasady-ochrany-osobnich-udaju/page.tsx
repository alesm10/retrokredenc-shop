import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zásady ochrany osobních údajů | Retro Kredenc',
  description: 'Informace o zpracování osobních údajů dle GDPR.',
  robots: { index: false, follow: false },
}

export default function ZasadyOchranyPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-serif mb-8">Zásady ochrany osobních údajů</h1>

        <p className="text-gray-600 mb-8">Platné od: 1. 1. 2025</p>

        <h2 className="text-2xl font-serif mt-8 mb-4">1. Správce osobních údajů</h2>
        <p>
          Správcem vašich osobních údajů je:<br />
          <strong>Aleš Miclík</strong><br />
          Adresa: Donín 18, 440 01 Louny<br />
          IČO: 49640194<br />
          E-mail: vmiclikova@gmail.com
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">2. Jaké údaje zpracováváme</h2>
        <p>Prostřednictvím kontaktního formuláře zpracováváme:</p>
        <ul>
          <li>Jméno a příjmení</li>
          <li>E-mailová adresa</li>
          <li>Obsah zprávy</li>
        </ul>

        <h2 className="text-2xl font-serif mt-8 mb-4">3. Účel zpracování</h2>
        <p>
          Vaše osobní údaje zpracováváme výhradně za účelem odpovědi na váš dotaz
          nebo vyřízení objednávky. Právním základem je váš souhlas udělený odesláním formuláře
          (čl. 6 odst. 1 písm. a) GDPR).
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">4. Příjemci osobních údajů</h2>
        <p>
          Pro zpracování formulářů využíváme službu <strong>Formspree</strong> (Formspree, Inc.),
          která zpracovává data v souladu s GDPR. Vaše údaje nepředáváme žádným dalším třetím stranám.
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">5. Doba uchovávání</h2>
        <p>
          Osobní údaje uchováváme po dobu nezbytně nutnou pro vyřízení vašeho dotazu,
          nejdéle však 1 rok od přijetí zprávy.
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">6. Vaše práva</h2>
        <p>Máte právo:</p>
        <ul>
          <li>na přístup ke svým osobním údajům</li>
          <li>na opravu nepřesných údajů</li>
          <li>na výmaz osobních údajů („právo být zapomenut")</li>
          <li>na omezení zpracování</li>
          <li>odvolat souhlas se zpracováním kdykoli</li>
          <li>podat stížnost u Úřadu pro ochranu osobních údajů (uoou.cz)</li>
        </ul>
        <p>
          Pro uplatnění práv nás kontaktujte na: <strong>vmiclikova@gmail.com</strong>
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">7. Cookies</h2>
        <p>
          Tento web používá pouze technické cookies nezbytné pro jeho fungování.
          Nepoužíváme analytické ani marketingové cookies.
        </p>
      </div>
    </div>
  )
}
