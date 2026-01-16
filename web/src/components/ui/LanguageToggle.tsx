'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { Globe } from 'lucide-react'

export function LanguageToggle() {
    const { lang, setLang } = useLanguage()

    return (
        <button
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#FFB81C] transition-colors"
            aria-label="Toggle language"
        >
            <Globe size={16} />
            <span>{lang === 'en' ? 'ES' : 'EN'}</span>
        </button>
    )
}
