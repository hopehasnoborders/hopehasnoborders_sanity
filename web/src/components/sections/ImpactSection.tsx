'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const AnimatedCounter = ({ target }: { target: number }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            let start = 0
            const duration = 2000
            const stepTime = Math.abs(Math.floor(duration / target))
            const timer = setInterval(() => {
                start += Math.ceil(target / 100)
                if (start > target) start = target
                setCount(start)
                if (start === target) clearInterval(timer)
            }, stepTime)
            return () => clearInterval(timer)
        }
    }, [isInView, target])

    return <span ref={ref}>{count.toLocaleString()}+</span>
}

interface Stat {
    value: number
    label: { en: string; es: string }
}

interface ImpactSectionProps {
    stats: Stat[]
}

export function ImpactSection({ stats }: ImpactSectionProps) {
    const { t } = useLanguage()

    return (
        <section className="py-32 bg-white border-t border-neutral-100">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    <div className="flex-1 pt-10">
                        <span className="text-[#FFB81C] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
                            {t({ en: 'Top Needs This Week', es: 'Necesidades Principales Esta Semana' })}
                        </span>
                        <h3 className="text-4xl font-serif mb-8 text-neutral-900 antialiased">
                            {t({ en: 'Help Us Meet Urgent Needs', es: 'Ayúdanos a Cubrir Necesidades Urgentes' })}
                        </h3>
                        <ul className="space-y-6 mb-12">
                            {[
                                { en: 'Winter Coats (All Sizes)', es: 'Abrigos de Invierno (Todas las Tallas)' },
                                { en: 'RTD Bus Passes', es: 'Pases de Autobús RTD' },
                                { en: 'Grocery Gift Cards ($25+)', es: 'Tarjetas de Regalo para Comestibles ($25+)' }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-neutral-700 font-light text-lg antialiased">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="text-green-600 w-3 h-3" strokeWidth={3} />
                                    </div>
                                    {t(item)}
                                </li>
                            ))}
                        </ul>
                        <a href="mailto:hopehasnoborders@gmail.com" className="text-[#FFB81C] font-serif italic text-2xl hover:text-black transition-colors flex items-center gap-3">
                            {t({ en: 'Email to coordinate drop-off', es: 'Correo para coordinar entrega' })} <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="bg-neutral-900 text-white p-12 md:p-16 rounded-sm w-full relative overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-neutral-800 rounded-full blur-3xl opacity-50"></div>

                            <h4 className="font-serif text-3xl mb-12 relative z-10 antialiased">Impact Snapshot</h4>
                            <div className="space-y-10 relative z-10">
                                {stats?.map((stat, idx) => (
                                    <div key={idx} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                                        <div className="text-4xl md:text-5xl font-bold text-[#FFB81C] block mb-2 font-serif">
                                            <AnimatedCounter target={stat.value} />
                                        </div>
                                        <span className="text-xs text-neutral-400 uppercase tracking-[0.2em] font-bold">{t(stat.label)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
