import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-serif text-primary hover:text-accent transition-colors">
            Retro Kredenc
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-text hover:text-primary transition-colors">
              Domů
            </Link>
            <Link href="/produkty" className="text-text hover:text-primary transition-colors">
              Produkty
            </Link>
            <Link href="/o-nas" className="text-text hover:text-primary transition-colors">
              O nás
            </Link>
            <Link href="/kontakt" className="text-text hover:text-primary transition-colors">
              Kontakt
            </Link>
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden text-text">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
