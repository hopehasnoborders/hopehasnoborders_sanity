'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

interface AnnouncementBarProps {
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

export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
    const { t } = useLanguage()

    if (!announcement?.active) return null

    const link = announcement.linkType === 'external'
        ? announcement.externalUrl
        : `/${announcement.internalRoute || 'donate'}`

    const BannerContent = () => (
        <div className="flex items-center">
            <span className="opacity-80 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                {t(announcement.label)}
            </span>
            <span className="mx-2 font-extrabold uppercase tracking-widest text-[10px] md:text-xs text-balance">
                {t(announcement.text)}
            </span>
            <a
                href={link || '#'}
                className="flex items-center gap-1 hover:opacity-70 transition-opacity ml-2 border-b border-neutral-900 font-bold uppercase tracking-widest text-[10px] md:text-xs"
            >
                {t(announcement.linkText)} <ArrowRight size={12} />
            </a>
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900/40 mx-8" />
        </div>
    )

    return (
        <div className="bg-[#FFB81C] text-black w-full z-50 relative h-10 overflow-hidden flex items-center shrink-0">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30
                }}
            >
                <div className="flex items-center">
                    {[...Array(12)].map((_, i) => (
                        <BannerContent key={i} />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
