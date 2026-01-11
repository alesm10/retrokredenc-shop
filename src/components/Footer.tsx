import Link from 'next/link'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Retro Kredenc</h3>
            <p className="text-white/80">
              Krása starých časů - autentický československý porcelán z let 1950-1989
            </p>
          </div>
          <div>
            <h3 className="text-xl font-serif mb-4">Navigace</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Domů
                </Link>
              </li>
              <li>
                <Link href="/produkty" className="text-white/80 hover:text-white transition-colors">
                  Produkty
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-white/80 hover:text-white transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-white/80 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif mb-4">Sledujte nás</h3>
            <SocialLinks />
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Retro Kredenc. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  )
}
