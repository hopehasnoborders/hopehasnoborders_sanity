'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { urlFor } from '@/lib/sanity'

interface HeroProps {
    hero: {
        tagline?: { en: string; es: string }
        title: { en: string; es: string }
        subtitle: { en: string; es: string }
        image?: any
        primaryButton?: { text: { en: string; es: string }; link: string }
        secondaryButton?: { text: { en: string; es: string }; link: string }
    }
}

export function Hero({ hero }: HeroProps) {
    const { t } = useLanguage()
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 1000], [0, 400])

    return (
        <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                {hero.image ? (
                    <img
                        src={urlFor(hero.image).url()}
                        alt="Community"
                        className="w-full h-full object-cover grayscale brightness-[0.7] scale-110"
                    />
                ) : (
                    <img
                        src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Community"
                        className="w-full h-full object-cover grayscale brightness-[0.7] scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </motion.div>

            <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl mt-24">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#FFB81C] font-bold tracking-[0.4em] text-[10px] uppercase mb-8"
                >
                    {t(hero.tagline) || 'Est. 2023 • Denver, CO'}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-5xl md:text-8xl lg:text-9xl font-serif text-white mb-8 leading-[0.85] tracking-tight whitespace-pre-line antialiased"
                >
                    {t(hero.title)}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg md:text-2xl text-neutral-200 font-light mb-12 max-w-2xl mx-auto leading-relaxed antialiased"
                >
                    {t(hero.subtitle)}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    {hero.primaryButton && (
                        <button className="bg-white text-black px-12 py-5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#FFB81C] hover:text-white transition-all duration-300 shadow-xl">
                            {t(hero.primaryButton.text)}
                        </button>
                    )}
                    {hero.secondaryButton && (
                        <button className="border border-white/30 backdrop-blur-sm text-white px-12 py-5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300">
                            {t(hero.secondaryButton.text)}
                        </button>
                    )}
                </motion.div>
            </div>
        </header>
    )
}
