import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obchodní podmínky | Retro Kredenc',
  description: 'Obchodní podmínky internetového obchodu Retro Kredenc.',
}

export default function ObchodniPodminkyPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-serif mb-8">Obchodní podmínky</h1>

        <p className="text-gray-600 mb-8">Platné od: 1. 1. 2025</p>

        <h2 className="text-2xl font-serif mt-8 mb-4">1. Prodávající</h2>
        <p>
          <strong>Aleš Miclík</strong><br />
          Adresa: Donín 18, 440 01 Louny<br />
          IČO: 49640194<br />
          E-mail: vmiclikova@gmail.com<br />
          (dále jen „prodávající")
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">2. Objednávka a uzavření smlouvy</h2>
        <p>
          Zboží je nabízeno prostřednictvím tohoto webu. Objednávku lze provést
          zasláním zprávy přes kontaktní formulář nebo e-mailem. Smlouva je uzavřena
          potvrzením objednávky ze strany prodávajícího.
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">3. Ceny a platba</h2>
        <p>
          Všechny ceny jsou uvedeny v Kč (CZK) a jsou konečné. Prodávající není plátcem DPH.
          Platba probíhá na základě dohody — převodem na účet nebo osobně při předání.
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">4. Dodání zboží</h2>
        <p>
          Zboží lze předat osobně nebo zaslat přepravní službou. Náklady na dopravu
          jsou sděleny individuálně při potvrzení objednávky. Dodací lhůta je zpravidla
          do 7 pracovních dnů od potvrzení objednávky.
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">5. Odstoupení od smlouvy</h2>
        <p>
          Spotřebitel má právo odstoupit od smlouvy bez udání důvodu do <strong>14 dnů</strong> od
          převzetí zboží (§ 1829 občanského zákoníku). Pro odstoupení nás kontaktujte na
          vmiclikova@gmail.com. Zboží zašlete zpět na vlastní náklady v původním stavu.
          Kupní cenu vrátíme do 14 dnů od doručení vráceného zboží.
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">6. Reklamace</h2>
        <p>
          Práva z vadného plnění se řídí platnou právní úpravou (zejména § 2099 a násl.
          občanského zákoníku). Podrobnosti jsou uvedeny v <a href="/reklamacni-rad" className="underline">Reklamačním řádu</a>.
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">7. Mimosoudní řešení sporů</h2>
        <p>
          V případě sporu má spotřebitel právo na mimosoudní řešení prostřednictvím
          České obchodní inspekce (coi.cz) nebo platformy EU pro řešení sporů online
          (ec.europa.eu/consumers/odr).
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">8. Závěrečná ustanovení</h2>
        <p>
          Tyto obchodní podmínky jsou platné a účinné od 1. 1. 2025.
          Prodávající si vyhrazuje právo podmínky měnit. Aktuální verze je vždy dostupná na tomto webu.
        </p>
      </div>
    </div>
  )
}
