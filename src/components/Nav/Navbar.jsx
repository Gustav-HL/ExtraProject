export function Navbar() {
  const navLinks = [
    { label: 'Works', href: '#works' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-6 right-8 sm:right-12 z-30 pointer-events-auto">
      <nav className="flex items-center gap-5 sm:gap-7">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-sans text-xs font-semibold tracking-widest text-gray-800 hover:text-black transition-colors uppercase"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}