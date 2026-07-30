const Navbar = () => {
    const navLinks = [
        { label: 'Works', href: '#works' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ]

    return (
        <header className="fixed top-6 right-8 sm:right-12 z-30 pointer-events-auto">
            <nav className="flex flex-col items-end gap-3 sm:gap-4">
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="inline-block font-serif text-xs font-semibold tracking-widest text-white hover:text-[#F2542D] hover:scale-105 transition-all duration-300 ease-out uppercase transform origin-center"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
        </header>
    )
}

export default Navbar