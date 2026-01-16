'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Globe } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'

const NAV_LINKS = [
    { label: { en: 'About', es: 'Sobre' }, href: '/about' },
    { label: { en: 'Programs', es: 'Programas' }, href: '/programs' },
    { label: { en: 'Volunteer', es: 'Voluntariado' }, href: '/volunteer' },
]

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { lang, setLang, t } = useLanguage()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const textColor = scrolled || isOpen ? 'text-neutral-900' : 'text-white'
    const bgColor = scrolled || isOpen ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    const topClass = scrolled ? 'top-0' : 'top-10'

    return (
        <nav className={`fixed left-0 w-full z-40 transition-all duration-500 ease-in-out ${bgColor} ${topClass}`}>
            <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                <Link
                    href="/"
                    className={`font-serif font-bold text-2xl tracking-widest z-50 transition-colors ${textColor}`}
                >
                    HHNB
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#FFB81C] transition-colors ${textColor}`}
                        >
                            {t(link.label)}
                        </Link>
                    ))}

                    <div className={`h-4 w-px ${scrolled ? 'bg-neutral-300' : 'bg-white/30'}`} />

                    <button
                        onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                        className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${textColor} hover:text-[#FFB81C]`}
                    >
                        <Globe size={14} />
                        {lang === 'en' ? 'ES' : 'EN'}
                    </button>

                    <Link
                        href="/donate"
                        className="bg-neutral-900 text-white hover:bg-[#FFB81C] px-6 py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                    >
                        Donate
                    </Link>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden z-50"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="text-neutral-900" /> : <Menu className={textColor} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8"
                    >
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-xl font-serif text-neutral-900"
                            >
                                {t(link.label)}
                            </Link>
                        ))}
                        <Link
                            href="/donate"
                            onClick={() => setIsOpen(false)}
                            className="text-xl font-serif text-neutral-900"
                        >
                            Donate
                        </Link>
                        <button
                            onClick={() => {
                                setLang(lang === 'en' ? 'es' : 'en')
                                setIsOpen(false)
                            }}
                            className="text-sm font-bold uppercase tracking-widest text-[#FFB81C] mt-8"
                        >
                            Switch to {lang === 'en' ? 'Español' : 'English'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
