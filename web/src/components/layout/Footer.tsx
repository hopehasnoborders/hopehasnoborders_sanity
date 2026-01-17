'use client'

import { useLanguage } from '@/lib/LanguageContext'

export function Footer() {
    const { t } = useLanguage()

    return (
        <footer className="bg-[var(--forrest)] text-[var(--bone)] py-20 border-t border-[var(--bone)]/10">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-8 flex justify-center">
                    <img
                        src="/img/logo-bone.png"
                        alt="Hope Has No Borders"
                        className="h-12 w-auto opacity-90"
                    />
                </div>
                <div className="flex justify-center gap-8 mb-12">
                    <a
                        href="https://www.instagram.com/hopehasnoborders"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--bone)]/70 hover:text-[var(--bone)] transition-colors text-xs uppercase tracking-widest font-bold"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://www.facebook.com/hopehasnobordersdenver"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--bone)]/70 hover:text-[var(--bone)] transition-colors text-xs uppercase tracking-widest font-bold"
                    >
                        Facebook
                    </a>
                    <a
                        href="mailto:hopehasnoborders@gmail.com"
                        className="text-[var(--bone)]/70 hover:text-[var(--bone)] transition-colors text-xs uppercase tracking-widest font-bold"
                    >
                        Email
                    </a>
                </div>
                <p className="text-[var(--bone)]/50 text-xs tracking-wide">
                    © 2024 Hope Has No Borders. {t({ en: 'All rights reserved.', es: 'Todos los derechos reservados.' })}
                </p>
            </div>
        </footer>
    )
}
