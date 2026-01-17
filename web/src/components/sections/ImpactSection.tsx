'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { ArrowRight, Quote } from 'lucide-react'
import Link from 'next/link'
import { urlFor as urlForImage } from '@/lib/sanity'

// --- Interfaces ---
interface KeyMetric {
    value: number
    prefix?: string
    suffix?: string
    label: { en: string; es: string }
}

interface OutcomeMetric {
    value: string
    label: { en: string; es: string }
}

interface ImpactProgram {
    _id: string
    title: { en: string; es: string }
    summary: { en: string; es: string }
    image: any // Sanity Image
    impactMetrics: { value: string; label: { en: string; es: string } }[]
}

interface Testimonial {
    _id: string
    quote: { en: string; es: string }
    author: string
    location?: string
}

interface ImpactSectionProps {
    data: {
        title?: { en: string; es: string }
        subtitle?: { en: string; es: string }
        keyMetrics?: KeyMetric[]
        outcomeMetrics?: OutcomeMetric[]
        programs?: ImpactProgram[]
        testimonials?: Testimonial[]
        closingCTA?: {
            text: { en: string; es: string }
            link: string
            message?: { en: string; es: string }
        }
    }
}

// --- Helper Components ---

function CountUp({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: "-100px" })
    const springValue = useSpring(0, { stiffness: 50, damping: 20 })

    useEffect(() => {
        if (inView) {
            springValue.set(value)
        }
    }, [inView, value, springValue])

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`
            }
        })
    }, [springValue, prefix, suffix])

    return <span ref={ref} />
}

// --- Default Data (Fallback to ensure immediate display) ---
const DEFAULT_IMPACT_DATA = {
    title: { en: 'Our Impact in Action', es: 'Nuestro Impacto en Acción' },
    subtitle: { en: '2025 marked the first full year of operations for Hope Has No Borders as a formal nonprofit.', es: '2025 marcó el primer año completo de operaciones para Hope Has No Borders como una organización sin fines de lucro formal.' },
    keyMetrics: [
        { label: { en: 'Funding Raised', es: 'Fondos Recaudados' }, value: 269652, prefix: '$' },
        { label: { en: 'Direct Program Spend', es: 'Gasto Directo del Programa' }, value: 91, suffix: '%' },
        { label: { en: 'Projected Budget (2025)', es: 'Presupuesto Proyectado (2025)' }, value: 231391, prefix: '$' },
        { label: { en: 'Below Budget', es: 'Por Debajo del Presupuesto' }, value: 7000, prefix: '$' },
    ],
    outcomeMetrics: [
        { label: { en: 'Improved Mental Health & Stability', es: 'Mejora en Salud Mental y Estabilidad' }, value: '78%' },
        { label: { en: 'Improved Employment Confidence', es: 'Mejora en Confianza Laboral' }, value: '70%' },
        { label: { en: 'Would Recommend Programs', es: 'Recomendaría los Programas' }, value: '100%' },
    ],
    programs: [
        {
            _id: 'p1',
            title: { en: 'Crisis to HOPE Fund', es: 'Fondo Crisis a ESPERANZA' },
            summary: { en: 'Emergency Stabilization', es: 'Estabilización de Emergencia' },
            image: null,
            impactMetrics: [
                { value: '667', label: { en: 'People Supported', es: 'Personas Apoyadas' } },
                { value: '333', label: { en: 'Children Supported', es: 'Niños Apoyados' } },
                { value: '<$500', label: { en: 'Grant Size', es: 'Tamaño de Beca' } },
            ]
        },
        {
            _id: 'p2',
            title: { en: 'Pathways to HOPE', es: 'Caminos a la ESPERANZA' },
            summary: { en: 'Pro Se Support', es: 'Apoyo Pro Se' },
            image: null,
            impactMetrics: [
                { value: '1,030', label: { en: 'Asylum Applications', es: 'Solicitudes de Asilo' } },
                { value: '431', label: { en: 'Work Authorizations', es: 'Permisos de Trabajo' } },
            ]
        },
        {
            _id: 'p3',
            title: { en: 'HOPE Community Services', es: 'Servicios Comunitarios' },
            summary: { en: 'Partnership Projects', es: 'Proyectos de Asociación' },
            image: null,
            impactMetrics: [
                { value: '$36,770', label: { en: 'Direct Gifts', es: 'Regalos Directos' } },
                { value: '1,970', label: { en: 'Volunteer Hours', es: 'Horas de Voluntariado' } },
            ]
        },
        {
            _id: 'p4',
            title: { en: 'HOPE Host Home Program', es: 'Programa de Alojamiento' },
            summary: { en: 'Transitional Housing', es: 'Vivienda de Transición' },
            image: null,
            impactMetrics: [
                { value: '55', label: { en: 'Individuals Housed', es: 'Individuos Alojados' } },
                { value: '100%', label: { en: 'Permanent Housing', es: 'Vivienda Permanente' } },
            ]
        }
    ],
    closingCTA: {
        text: { en: 'Support Our Work', es: 'Apoya Nuestro Trabajo' },
        link: '/donate',
        message: { en: "We couldn't do this without your support.", es: "No podríamos hacer esto sin tu apoyo." }
    }
}

export function ImpactSection({ data }: ImpactSectionProps) {
    const { t } = useLanguage()

    // Use fallback data if CMS data is missing (or missing key metrics)
    const content = (data && data.keyMetrics) ? data : DEFAULT_IMPACT_DATA

    // Ensure we have something to render
    if (!content) return null

    // Swap 'data' for 'content' in usage below
    const dataToRender = content;

    return (
        <section className="bg-neutral-900 text-white overflow-hidden relative">
            {/* Background Texture - Flow Field / Noise */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-soft-light">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Dark to Light Vertical Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-800 z-0" />

            {/* 1. Header */}
            <div className="container mx-auto px-6 py-24 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-serif mb-6 inline-block relative group">
                        {data.title ? t(data.title) : "Our Impact in Action"}
                        <motion.span
                            className="absolute -bottom-2 left-0 w-full h-1 bg-[var(--yarrow)] origin-left"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        {data.subtitle ? t(data.subtitle) : "Making a tangible difference in our community."}
                    </p>
                </motion.div>

                {/* 2. Key Metrics Grid */}
                {data.keyMetrics && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                        {data.keyMetrics.map((metric, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-[var(--yarrow)]/50 transition-colors group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--yarrow)]/0 to-[var(--yarrow)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <h3 className="text-4xl md:text-5xl font-bold text-[var(--yarrow)] mb-2 relative z-10">
                                    <CountUp value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                                </h3>
                                <p className="text-neutral-300 font-medium tracking-wide text-sm relative z-10">
                                    {t(metric.label)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Program Impact Panels */}
            {data.programs && (
                <div className="container mx-auto px-6 py-24 relative z-10">
                    <div className="flex flex-col gap-24">
                        {data.programs.map((program, i) => (
                            <motion.div
                                key={program._id}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                            >
                                {/* Text Content */}
                                <div className="flex-1 space-y-8">
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">
                                            {t(program.title)}
                                        </h3>
                                        <p className="text-[var(--yarrow)] font-bold tracking-widest uppercase text-xs">
                                            {program.summary && t(program.summary)}
                                        </p>
                                    </div>

                                    {program.impactMetrics && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {program.impactMetrics.map((metric, idx) => (
                                                <div key={idx} className="border-l-2 border-[var(--yarrow)] pl-4">
                                                    <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                                                    <p className="text-neutral-400 text-sm">{t(metric.label)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <Link
                                        href={`/programs#${program._id}`}
                                        className="inline-flex items-center gap-2 text-white hover:text-[var(--yarrow)] transition-colors text-sm font-bold uppercase tracking-widest group"
                                    >
                                        Learn More
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Image */}
                                <div className="flex-1 w-full relative group">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                        {program.image ? (
                                            <Image
                                                src={urlForImage(program.image).url()}
                                                alt={t(program.title)}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-600">
                                                No Image Available
                                            </div>
                                        )}
                                        {/* Highlight Border/Trail effect */}
                                        <div className="absolute inset-0 border border-white/10 rounded-2xl z-10" />
                                    </div>
                                    {/* Deco Blob */}
                                    <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--yarrow)]/20 blur-3xl rounded-full -z-10 ${i % 2 !== 0 ? 'left-auto right-auto -left-6' : ''}`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* 4. Outcome Metrics Strip */}
            {data.outcomeMetrics && (
                <div className="w-full bg-neutral-950 py-16 border-y border-white/5 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                            {data.outcomeMetrics.map((metric, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-[var(--yarrow)]/30 flex items-center justify-center relative mb-6 group-hover:border-[var(--yarrow)] transition-colors duration-500">
                                        <div className="absolute inset-0 rounded-full bg-[var(--yarrow)]/5 animate-pulse" />
                                        <span className="text-2xl md:text-3xl font-bold text-white relative z-10">
                                            {metric.value}
                                        </span>
                                    </div>
                                    <p className="text-neutral-300 text-sm md:text-base font-medium max-w-[200px]">
                                        {t(metric.label)}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 5. Voices of Impact (Carousel) & 6. Closing CTA */}
            <div className="container mx-auto px-6 py-32 relative z-10 text-center">
                {/* Carousel */}
                {data.testimonials && data.testimonials.length > 0 && (
                    <div className="mb-32 relative">
                        <Quote className="w-12 h-12 text-[var(--yarrow)] mx-auto mb-8 opacity-50" />
                        <div className="max-w-4xl mx-auto h-[200px] flex items-center justify-center relative">
                            {/* Simple fading carousel */}
                            <Carousel testimonials={data.testimonials} />
                        </div>
                    </div>
                )}

                {/* Closing CTA */}
                {data.closingCTA && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto"
                    >
                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-8">
                            {data.closingCTA.message ? t(data.closingCTA.message) : "We couldn't do this without your support."}
                        </h3>
                        <Link
                            href={data.closingCTA.link || '/donate'}
                            className="bg-[var(--yarrow)] text-black px-10 py-5 rounded-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all inline-block shadow-[0_0_20px_rgba(255,184,28,0.3)] hover:shadow-[0_0_30px_rgba(255,184,28,0.5)] transform hover:-translate-y-1"
                        >
                            {t(data.closingCTA.text)}
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

function Carousel({ testimonials }: { testimonials: Testimonial[] }) {
    const [index, setIndex] = useState(0)
    const { t } = useLanguage()

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length)
        }, 7000)
        return () => clearInterval(timer)
    }, [testimonials.length])

    const current = testimonials[index]

    return (
        <motion.div
            key={current._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
        >
            <p className="text-xl md:text-3xl font-serif text-white leading-relaxed mb-6">
                "{t(current.quote)}"
            </p>
            <cite className="not-italic text-[var(--yarrow)] font-bold tracking-widest text-sm uppercase">
                &mdash; {current.author}{current.location ? `, ${current.location}` : ''}
            </cite>
        </motion.div>
    )
}
