import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'O nás | Retro Kredenc',
  description: 'Poznejte příběh Retro Kredenc - specializujeme se na autentický československý porcelán z let 1950-1989.',
  openGraph: {
    title: 'O nás | Retro Kredenc',
    description: 'Poznejte příběh Retro Kredenc',
  },
}

export default function ONasPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">
          O nás
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Vítejte v Retro Kredenc, kde se setkává historie s krásou. Specializujeme se na prodej 
            autentického československého porcelánu z období 50. až 80. let minulého století.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">Náš příběh</h2>
          <p className="text-gray-700 leading-relaxed">
            Každý kousek v naší nabídce představuje kus historie Československa. Porcelán z tohoto 
            období je známý svou kvalitou, elegancí a jedinečným designem, který odráží estetiku 
            tehdejší doby. Naše produkty jsou pečlivě vybrané a každý kus má svůj vlastní příběh.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">Proč retro porcelán?</h2>
          <p className="text-gray-700 leading-relaxed">
            Retro porcelán není jen o designu - je to připomínka doby, kdy se věci vyráběly s 
            péčí a pozorností k detailu. Každý hrnek, každý talíř nese v sobě kus historie a 
            přináší do vašeho domova jedinečnou atmosféru starých časů.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">Naše hodnoty</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Autentičnost - prodáváme pouze originální československý porcelán</li>
            <li>Kvalita - každý kus je pečlivě zkontrolován</li>
            <li>Historie - ctíme příběh každého kousku</li>
            <li>Spokojenost zákazníků - vaše radost je naší prioritou</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
