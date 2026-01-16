'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Scale, Users, ChevronDown, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

interface Program {
    _id: string
    icon: string
    title: { en: string; es: string }
    summary: { en: string; es: string }
    description: { en: string; es: string }
}

interface ProgramsGridProps {
    header: {
        eyebrow: { en: string; es: string }
        title: { en: string; es: string }
        subtitle: { en: string; es: string }
    }
    programs: Program[]
}

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    switch (name) {
        case 'home': return <Home strokeWidth={1} className={className} />
        case 'scale': return <Scale strokeWidth={1} className={className} />
        case 'users': return <Users strokeWidth={1} className={className} />
        default: return <Home strokeWidth={1} className={className} />
    }
}

export function ProgramsGrid({ header, programs }: ProgramsGridProps) {
    const [activeCard, setActiveCard] = useState<string | null>(null)
    const { t } = useLanguage()

    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <span className="text-[#FFB81C] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                        {t(header.eyebrow)}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif leading-tight text-neutral-900 antialiased">
                        {t(header.title)}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {programs.map((program) => {
                        const isOpen = activeCard === program._id
                        return (
                            <div
                                key={program._id}
                                onClick={() => setActiveCard(isOpen ? null : program._id)}
                                className={`p-10 border transition-all duration-300 group cursor-pointer ${isOpen ? 'border-[#FFB81C] bg-orange-50/10 shadow-lg' : 'border-neutral-100 hover:border-[#FFB81C] hover:shadow-md'}`}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <DynamicIcon
                                        name={program.icon}
                                        className={`w-12 h-12 transition-colors ${isOpen ? 'text-[#FFB81C]' : 'text-neutral-300 group-hover:text-[#FFB81C]'}`}
                                    />
                                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                                        <ChevronDown className="w-5 h-5 text-neutral-300" />
                                    </motion.div>
                                </div>
                                <h3 className="text-2xl font-serif mb-3 text-neutral-900 antialiased">{t(program.title)}</h3>
                                <p className="text-neutral-500 font-light text-sm leading-relaxed">{t(program.summary)}</p>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                            className="overflow-hidden border-t border-neutral-100"
                                        >
                                            <div className="pt-6">
                                                <p className="text-neutral-600 font-light mb-6 text-sm leading-relaxed antialiased">
                                                    {t(program.description)}
                                                </p>
                                                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-[#FFB81C] hover:text-black transition-colors flex items-center gap-2">
                                                    Learn More <ArrowRight size={12} />
                                                </a>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
