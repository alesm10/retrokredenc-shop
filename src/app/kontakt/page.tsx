import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt | Retro Kredenc',
  description: 'Kontaktujte nás ohledně retro československého porcelánu. Rádi vám pomůžeme najít ten správný kousek.',
  openGraph: {
    title: 'Kontakt | Retro Kredenc',
    description: 'Kontaktujte nás ohledně retro československého porcelánu',
  },
}

export default function KontaktPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">
          Kontakt
        </h1>
        
        <div className="mb-12 text-center">
          <p className="text-lg text-gray-700 mb-8">
            Máte dotaz ohledně našich produktů? Chcete se zeptat na konkrétní kousek? 
            Nebo máte zájem o objednávku? Neváhejte nás kontaktovat!
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
