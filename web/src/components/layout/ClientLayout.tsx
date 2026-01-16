'use client'

import { ReactNode } from 'react'
import { LanguageProvider } from '@/lib/LanguageContext'
import { Navigation, Footer } from '@/components/layout'

interface ClientLayoutProps {
    children: ReactNode
    announcement: {
        active: boolean
        text: { en: string; es: string }
        linkType?: 'internal' | 'external'
        internalRoute?: string
        externalUrl?: string
    } | null
}

export function ClientLayout({ children, announcement }: ClientLayoutProps) {
    return (
        <LanguageProvider>
            <div className="min-h-screen flex flex-col">
                {announcement?.active && <AnnouncementBarClient announcement={announcement} />}
                <Navigation />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </LanguageProvider>
    )
}

function AnnouncementBarClient({ announcement }: { announcement: NonNullable<ClientLayoutProps['announcement']> }) {
    const { useLanguage } = require('@/lib/LanguageContext')
    const { t } = useLanguage()

    const link = announcement.linkType === 'external'
        ? announcement.externalUrl
        : `/${announcement.internalRoute || 'donate'}`

    const handleClick = () => {
        if (announcement.linkType === 'external' && announcement.externalUrl) {
            window.open(announcement.externalUrl, '_blank')
        } else {
            window.location.href = link || '/donate'
        }
    }

    return (
        <div
            className="bg-[#FFB81C] text-black text-xs font-bold tracking-widest uppercase py-3 px-4 text-center cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleClick}
            role="button"
            tabIndex={0}
        >
            {t(announcement.text)} <span className="underline ml-2">Act Now</span>
        </div>
    )
}
