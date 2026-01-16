'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

interface Testimonial {
    _id: string
    quote: { en: string; es: string }
    author: { en: string; es: string }
    location?: string
}

interface TestimonialsProps {
    testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
    const [current, setCurrent] = useState(0)
    const { t } = useLanguage()

    if (!testimonials || testimonials.length === 0) return null

    return (
        <section className="py-32 bg-neutral-50 border-t border-neutral-100">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <span className="text-[#FFB81C] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                        {t({ en: 'Voices from Our Community', es: 'Voces de Nuestra Comunidad' })}
                    </span>
                    <h2 className="text-4xl font-serif leading-tight text-neutral-900 antialiased">
                        {t({ en: 'Stories of Hope', es: 'Historias de Esperanza' })}
                    </h2>
                </div>

                <div className="relative min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left"
                        >
                            <div className="w-32 h-32 rounded-full bg-white shadow-xl p-1 flex-shrink-0">
                                <div className="w-full h-full rounded-full bg-neutral-200 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                                        <User className="text-orange-400 w-12 h-12" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <blockquote className="text-2xl md:text-3xl font-serif text-neutral-800 mb-6 italic leading-relaxed antialiased">
                                    "{t(testimonials[current].quote)}"
                                </blockquote>
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <div className="h-px w-12 bg-[#FFB81C]"></div>
                                    <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest">
                                        {t(testimonials[current].author)} {testimonials[current].location && `, ${testimonials[current].location}`}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center gap-4 mt-12">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-[#FFB81C] w-8' : 'bg-neutral-300 hover:bg-orange-300'}`}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
