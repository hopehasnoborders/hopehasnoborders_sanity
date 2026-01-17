'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { LanguageProvider } from '@/lib/LanguageContext'
import { Navigation, Footer } from '@/components/layout'

// --- CONFIGURATION ---
const BANNER_CONFIG = {
    DURATION: 150, // Time in seconds for one full loop. Higher = Slower.
}

interface ClientLayoutProps {
    children: ReactNode
    announcement: {
        active: boolean
        label?: { en: string; es: string }
        text: { en: string; es: string }
        linkText?: { en: string; es: string }
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

    const label = announcement?.label ? t(announcement.label) : 'Urgent:'
    const text = announcement?.text ? t(announcement.text) : ''
    const linkText = announcement?.linkText ? t(announcement.linkText) : 'Act Now'

    // Don't render if text is empty
    if (!text) {
        return null
    }

    // Reusable component for the repeating message
    const BannerContent = () => (
        <div className="flex items-center">
            <span className="opacity-80 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                {label}
            </span>
            <span className="mx-2 font-extrabold uppercase tracking-widest text-[10px] md:text-xs">
                {text}
            </span>
            <button
                onClick={handleClick}
                className="flex items-center gap-1 hover:opacity-70 transition-opacity ml-2 border-b border-neutral-900 font-bold uppercase tracking-widest text-[10px] md:text-xs"
            >
                {linkText} <ArrowRight size={12} />
            </button>
            {/* Divider Dot between repeated messages */}
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900/40 mx-8" />
        </div>
    )

    return (
        <div className="bg-[#FFB81C] text-neutral-900 w-full z-50 relative h-10 overflow-hidden flex items-center">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: BANNER_CONFIG.DURATION
                }}
            >
                {/* Container for the loop. 
                    We repeat the content multiple times (12x) to ensure it covers 
                    the full screen width on large monitors before the loop resets.
                */}
                <div className="flex items-center">
                    {[...Array(12)].map((_, i) => (
                        <BannerContent key={i} />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
