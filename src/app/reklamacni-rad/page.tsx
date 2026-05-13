import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reklamační řád | Retro Kredenc',
  description: 'Reklamační řád internetového obchodu Retro Kredenc.',
}

export default function ReklamacniRadPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-serif mb-8">Reklamační řád</h1>

        <p className="text-gray-600 mb-8">Platný od: 1. 1. 2025</p>

        <h2 className="text-2xl font-serif mt-8 mb-4">1. Úvodní ustanovení</h2>
        <p>
          Tento reklamační řád upravuje práva a povinnosti mezi prodávajícím
          <strong>Alešem Miclíkem</strong>, IČO: 49640194, e-mail: vmiclikova@gmail.com
          a kupujícím při uplatnění práv z vadného plnění.
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">2. Záruční doba</h2>
        <p>
          Na prodávané zboží se vztahuje záruční doba <strong>24 měsíců</strong> od převzetí
          zboží kupujícím (§ 2165 občanského zákoníku). U použitého zboží (starožitností
          a vintage předmětů) lze záruční dobu zkrátit na 12 měsíců, o čemž bude kupující
          předem informován.
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">3. Uplatnění reklamace</h2>
        <p>Reklamaci uplatněte:</p>
        <ul>
          <li>E-mailem na: <strong>vmiclikova@gmail.com</strong></li>
          <li>V e-mailu uveďte: jméno, číslo objednávky, popis vady, fotodokumentaci</li>
        </ul>
        <p>
          Reklamaci potvrdíme bez zbytečného odkladu, nejpozději do 3 pracovních dnů.
        </p>

        <h2 className="text-2xl font-serif mt-8 mb-4">4. Vyřízení reklamace</h2>
        <p>
          Reklamaci vyřídíme do <strong>30 dnů</strong> od jejího uplatnění. Kupující má právo na:
        </p>
        <ul>
          <li>opravu nebo výměnu zboží</li>
          <li>přiměřenou slevu z kupní ceny</li>
          <li>odstoupení od smlouvy (při podstatné vadě nebo nevyřízení ve lhůtě)</li>
        </ul>

        <h2 className="text-2xl font-serif mt-8 mb-4">5. Výluky ze záruky</h2>
        <p>Záruka se nevztahuje na:</p>
        <ul>
          <li>opotřebení vzniklé běžným používáním</li>
          <li>vady způsobené nevhodným zacházením nebo skladováním</li>
          <li>vady o nichž byl kupující předem informován (např. drobné praskliny u starožitností)</li>
        </ul>

        <h2 className="text-2xl font-serif mt-8 mb-4">6. Mimosoudní řešení sporů</h2>
        <p>
          Spotřebitel má právo obrátit se na Českou obchodní inspekci (coi.cz)
          nebo využít platformu ODR (ec.europa.eu/consumers/odr).
        </p>
      </div>
    </div>
  )
}
