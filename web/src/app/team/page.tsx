'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { Users, Heart, Mail } from 'lucide-react'
import Link from 'next/link'

interface TeamMember {
    name: string
    role: { en: string; es: string }
    bio: { en: string; es: string }
    image: string
    category: 'leadership' | 'board' | 'contractor'
    serviceLength?: string
}

const teamMembers: TeamMember[] = [
    // Leadership
    {
        name: 'Jenifer Kettering',
        role: { en: 'Executive Director & Founder, Board Member', es: 'Directora Ejecutiva y Fundadora, Miembro de la Junta' },
        bio: {
            en: 'Jenifer Kettering brings more than 20 years of experience serving individuals and families in need through roles in mental health, foster care, therapeutic recreation, crisis counseling, and education. Her work has always centered on helping people find stability, dignity, and connection during life\'s most challenging times.',
            es: 'Jenifer Kettering aporta más de 20 años de experiencia sirviendo a individuos y familias necesitadas a través de roles en salud mental, cuidado de crianza, recreación terapéutica, consejería de crisis y educación.'
        },
        image: '/img/jenifer-kettering.jpg',
        category: 'leadership'
    },
    {
        name: 'Andrea Ryall',
        role: { en: 'Executive Director & Founder, Board Member', es: 'Directora Ejecutiva y Fundadora, Miembro de la Junta' },
        bio: {
            en: 'Andrea Ryall is a mother of three and a passionate community builder based in Denver, Colorado. Inspired by the belief that everyone deserves dignity, meaningful work, and the ability to provide for their family, Andrea founded Hope Has No Borders to bring humanitarian relief and community support to people moving from crisis to hope.',
            es: 'Andrea Ryall es madre de tres hijos y una apasionada constructora de comunidades con sede en Denver, Colorado. Inspirada por la creencia de que todos merecen dignidad, trabajo significativo y la capacidad de proveer para su familia.'
        },
        image: '/img/andrea-ryall.png',
        category: 'leadership'
    },
    // Board of Directors
    {
        name: 'Kasey Fox',
        role: { en: 'Board Member', es: 'Miembro de la Junta' },
        bio: {
            en: 'Kasey Fox is the Senior Director of 211 and Disaster Response at Mile High United Way, where she leads statewide efforts to strengthen community resilience. A former U.S. Peace Corps volunteer in Panama\'s Darién Gap, she brings more than a decade of experience in community development, disaster response, and volunteer management.',
            es: 'Kasey Fox es la Directora Senior de 211 y Respuesta a Desastres en Mile High United Way, donde lidera esfuerzos estatales para fortalecer la resiliencia comunitaria.'
        },
        image: '/img/webportrait_kasey.png',
        category: 'board'
    },
    {
        name: 'Matt Tebo',
        role: { en: 'Board Member', es: 'Miembro de la Junta' },
        bio: {
            en: 'Matt Tebo is a product and program development professional with more than nine years of nonprofit experience in workforce development and social enterprise. He has launched innovative, revenue-positive programs for organizations including the Denver Metro Chamber Leadership Foundation and Impact on Education.',
            es: 'Matt Tebo es un profesional de desarrollo de productos y programas con más de nueve años de experiencia sin fines de lucro en desarrollo de fuerza laboral y empresa social.'
        },
        image: '/img/webportrait_matt.png',
        category: 'board'
    },
    {
        name: 'Emma Hudson',
        role: { en: 'Board Member', es: 'Miembro de la Junta' },
        bio: {
            en: 'Emma Hudson brings more than a decade of experience in lobbying, government relations, policy analysis, and advocacy with a focus on state budgets and vulnerable populations. A skilled communicator and public speaker, she specializes in politics, interpersonal communication, and conflict resolution.',
            es: 'Emma Hudson aporta más de una década de experiencia en cabildeo, relaciones gubernamentales, análisis de políticas y defensa con enfoque en presupuestos estatales y poblaciones vulnerables.'
        },
        image: '/img/webportrait_emma.png',
        category: 'board'
    },
    {
        name: 'Keith Reeser',
        role: { en: 'Board Member', es: 'Miembro de la Junta' },
        bio: {
            en: 'Keith Reeser is a husband, father, and pastor who is passionate about extending kindness, grace, and compassion to everyone he meets. Serving with Hope Has No Borders reminded him that while one person may not help thousands, each act of care has profound value.',
            es: 'Keith Reeser es esposo, padre y pastor apasionado por extender bondad, gracia y compasión a todos los que conoce.'
        },
        image: '/img/webportrait_keith.png',
        category: 'board'
    },
    {
        name: 'Heather Carlson',
        role: { en: 'Board Member', es: 'Miembro de la Junta' },
        bio: {
            en: 'Heather Carlson is a seasoned professional with a 20-year career at Albertsons Companies and a dedicated advocate for community support. She has served for many years on the Denver Friends Church leadership team, contributing to children\'s programs, outreach, and immigrant integration.',
            es: 'Heather Carlson es una profesional experimentada con una carrera de 20 años en Albertsons Companies y una dedicada defensora del apoyo comunitario.'
        },
        image: '/img/webportrait_heather.png',
        category: 'board'
    },
    // Contractors
    {
        name: 'Jill Roth',
        role: { en: 'Bilingual Contractor', es: 'Contratista Bilingüe' },
        bio: {
            en: 'Jill Roth has over a decade of experience in the nonprofit sector, with a strong focus on community engagement and cross-cultural collaboration. Since 2024, Jill has supported immigrant and refugee communities in the Denver area.',
            es: 'Jill Roth tiene más de una década de experiencia en el sector sin fines de lucro, con un fuerte enfoque en el compromiso comunitario y la colaboración intercultural.'
        },
        image: '/img/webportrait_jill.png',
        category: 'contractor',
        serviceLength: 'Since September 2024'
    },
    {
        name: 'Cassandra "Cassi" Coleman',
        role: { en: 'Bilingual Contractor', es: 'Contratista Bilingüe' },
        bio: {
            en: 'Cassandra "Cassi" Coleman is a licensed practical nurse with more than 16 years of experience in healthcare and a deep passion for serving immigrant and asylum-seeking communities. Bilingual in Spanish and English and certified as an American Red Cross trainer.',
            es: 'Cassandra "Cassi" Coleman es una enfermera práctica licenciada con más de 16 años de experiencia en atención médica y una profunda pasión por servir a las comunidades inmigrantes y solicitantes de asilo.'
        },
        image: '/img/webportrait_cassandra.png',
        category: 'contractor',
        serviceLength: 'Since June 2024'
    },
    {
        name: 'Amanda Burr',
        role: { en: 'Bilingual Contractor', es: 'Contratista Bilingüe' },
        bio: {
            en: 'Amanda Burr is an immigration advocate dedicated to empowering immigrant communities through mentorship, language access, and navigation support. After a 25-year career in marketing, she now channels her skills and empathy into helping immigrants thrive.',
            es: 'Amanda Burr es una defensora de la inmigración dedicada a empoderar a las comunidades inmigrantes a través de mentoría, acceso al idioma y apoyo de navegación.'
        },
        image: '/img/webportrait_amanda.png',
        category: 'contractor',
        serviceLength: 'Since June 2024'
    },
]

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
    const { t } = useLanguage()
    const [expanded, setExpanded] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)
    const bioRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const checkOverflow = () => {
            if (bioRef.current) {
                setIsOverflowing(bioRef.current.scrollHeight > bioRef.current.clientHeight)
            }
        }
        checkOverflow()
        window.addEventListener('resize', checkOverflow)
        return () => window.removeEventListener('resize', checkOverflow)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* Photo - slightly smaller on mobile */}
            <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-neutral-100">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {/* Content - better mobile padding */}
            <div className="p-5 sm:p-6">
                <h3 className="font-serif text-lg sm:text-xl text-neutral-900 mb-1">{member.name}</h3>
                <p className="text-[#FFB81C] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
                    {t(member.role)}
                </p>
                <p
                    ref={bioRef}
                    className={`text-neutral-600 text-sm leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}
                >
                    {t(member.bio)}
                </p>
                {(isOverflowing || expanded) && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-[#FFB81C] hover:text-[#E5A519] text-sm font-semibold mt-2 py-1 transition-colors touch-manipulation"
                    >
                        {expanded
                            ? t({ en: 'Show less', es: 'Ver menos' })
                            : t({ en: 'Read more', es: 'Leer más' })
                        }
                    </button>
                )}
                {member.serviceLength && (
                    <p className="text-neutral-400 text-xs mt-3 italic">{member.serviceLength}</p>
                )}
            </div>
        </motion.div>
    )
}

export default function TeamPage() {
    const { t } = useLanguage()

    const leadership = teamMembers.filter(m => m.category === 'leadership')
    const board = teamMembers.filter(m => m.category === 'board')
    const contractors = teamMembers.filter(m => m.category === 'contractor')

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <section className="bg-neutral-900 pt-32 pb-20">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Users className="w-12 h-12 text-[#FFB81C] mx-auto mb-6" />
                        <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">
                            {t({ en: 'Who We Are', es: 'Quiénes Somos' })}
                        </h1>
                        <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                            {t({
                                en: 'Meet the passionate individuals dedicated to bridging the gap from crisis to stability.',
                                es: 'Conoce a las personas apasionadas dedicadas a cerrar la brecha de la crisis a la estabilidad.'
                            })}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-[#FFB81C] font-bold tracking-[0.3em] text-xs uppercase mb-4">
                            {t({ en: 'Founders', es: 'Fundadoras' })}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif text-neutral-900">
                            {t({ en: 'Leadership', es: 'Liderazgo' })}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {leadership.map((member, index) => (
                            <TeamCard key={member.name} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Board Section */}
            <section className="py-20 bg-neutral-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-[#FFB81C] font-bold tracking-[0.3em] text-xs uppercase mb-4">
                            {t({ en: 'Governance', es: 'Gobernanza' })}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif text-neutral-900">
                            {t({ en: 'Board of Directors', es: 'Junta Directiva' })}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {board.map((member, index) => (
                            <TeamCard key={member.name} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Contractors Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-[#FFB81C] font-bold tracking-[0.3em] text-xs uppercase mb-4">
                            {t({ en: 'Our Team', es: 'Nuestro Equipo' })}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif text-neutral-900">
                            {t({ en: 'Contractors', es: 'Contratistas' })}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {contractors.map((member, index) => (
                            <TeamCard key={member.name} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Tax Info Section */}
            <section className="py-16 bg-neutral-100">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-neutral-600 mb-2">
                        <strong>{t({ en: 'Tax ID / EIN:', es: 'ID Fiscal / EIN:' })}</strong> 99-1897287
                    </p>
                    <Link
                        href="https://drive.google.com/file/d/1cMcmtmKotyWMHRVMY4WjgeywceAvGJVX/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FFB81C] hover:underline font-semibold"
                    >
                        {t({ en: 'View 990 Tax Form (2024)', es: 'Ver Formulario 990 (2024)' })}
                    </Link>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-neutral-900">
                <div className="container mx-auto px-6 text-center">
                    <Heart className="w-10 h-10 text-[#FFB81C] mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
                        {t({ en: 'Join Our Mission', es: 'Únete a Nuestra Misión' })}
                    </h2>
                    <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
                        {t({
                            en: 'We\'re always looking for passionate volunteers and supporters to help us make a difference.',
                            es: 'Siempre buscamos voluntarios y colaboradores apasionados para ayudarnos a hacer la diferencia.'
                        })}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/volunteer"
                            className="bg-white hover:bg-[#FFB81C] text-neutral-900 hover:text-white px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest transition-colors"
                        >
                            {t({ en: 'Volunteer', es: 'Voluntariado' })}
                        </Link>
                        <Link
                            href="mailto:hopehasnoborders@gmail.com"
                            className="border border-white/30 text-white hover:bg-white hover:text-neutral-900 px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-2"
                        >
                            <Mail className="w-4 h-4" />
                            {t({ en: 'Contact Us', es: 'Contáctanos' })}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
