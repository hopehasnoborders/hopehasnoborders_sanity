'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { ReactNode } from 'react'

interface ClientTranslationsProps {
    en: ReactNode
    es: ReactNode
}

export default function ClientTranslations({ en, es }: ClientTranslationsProps) {
    const { lang } = useLanguage()
    return <>{lang === 'en' ? en : es}</>
}
