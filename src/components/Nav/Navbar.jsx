import React from 'react'

const Navbar = ({ activeView, onViewChange }) => {
    const navLinks = [
        { label: 'Home', id: 'home' },
        { label: 'Works', id: 'works' },
        { label: 'About', id: 'about' },
        { label: 'Contact', id: 'contact' },
    ]

    return (
        <header className="fixed top-6 right-8 sm:right-12 z-30 pointer-events-auto">
            <nav className="flex flex-col items-end gap-3 sm:gap-4">
                {navLinks.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => onViewChange(link.id)}
                        className={`inline-block font-serif text-xs font-semibold tracking-widest transition-all duration-300 ease-out uppercase transform origin-center ${
                            activeView === link.id ? 'text-[#F2542D] scale-105' : 'text-white hover:text-[#F2542D] hover:scale-105'
                        }`}
                    >
                        {link.label}
                    </button>
                ))}
            </nav>
        </header>
    )
}

export default Navbar