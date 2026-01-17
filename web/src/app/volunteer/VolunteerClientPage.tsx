'use client'

import { motion } from 'framer-motion'
import {
    Heart, ArrowRight, Bike, Mail, ShoppingBag, Pill, Gift, Bed, Laptop,
    Users, PenTool, Megaphone, Globe, Calendar, Baby, MessageCircle, Share2,
    ExternalLink
} from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import Link from 'next/link'
import Image from 'next/image'

// Donation needs data
const DONATION_NEEDS = [
    {
        icon: Bike,
        title: { en: 'Transportation Support', es: 'Apoyo de Transporte' },
        items: { en: 'Bikes, helmets, locks, RTD bus passes', es: 'Bicicletas, cascos, candados, pases de autobús RTD' }
    },
    {
        icon: Mail,
        title: { en: 'Mailing Support', es: 'Apoyo de Correo' },
        items: { en: 'Stamps, manila envelopes', es: 'Estampillas, sobres manila' }
    },
    {
        icon: ShoppingBag,
        title: { en: 'Food Support', es: 'Apoyo Alimentario' },
        items: { en: 'Gift cards, groceries, frozen meals, dry goods (beans, rice, pasta)', es: 'Tarjetas de regalo, comestibles, comidas congeladas, productos secos (frijoles, arroz, pasta)' }
    },
    {
        icon: Pill,
        title: { en: 'OTC Medicine', es: 'Medicamentos sin Receta' },
        items: { en: "Children's and adult Ibuprofen, Neosporin, first aid kits", es: 'Ibuprofeno para niños y adultos, Neosporin, botiquines de primeros auxilios' }
    },
    {
        icon: Gift,
        title: { en: 'Welcome Baskets', es: 'Canastas de Bienvenida' },
        items: { en: "Hygiene items, food, new socks & underwear (adult & children's sizes), small activities/crafts for children", es: 'Artículos de higiene, alimentos, calcetines y ropa interior nuevos (tallas de adultos y niños), pequeñas actividades/manualidades para niños' }
    },
    {
        icon: Bed,
        title: { en: 'Bedding', es: 'Ropa de Cama' },
        items: { en: 'Twin mattresses, sheets, blankets, pillows', es: 'Colchones individuales, sábanas, mantas, almohadas' }
    },
    {
        icon: Laptop,
        title: { en: 'Tech Support', es: 'Apoyo Tecnológico' },
        items: { en: 'Working computers, phones, iPads', es: 'Computadoras, teléfonos, iPads en funcionamiento' }
    }
]

// Professional volunteerism opportunities
const PROFESSIONAL_OPPORTUNITIES = [
    { icon: Megaphone, title: { en: 'Social Media Management', es: 'Gestión de Redes Sociales' } },
    { icon: PenTool, title: { en: 'Grant Writing / Fundraising', es: 'Redacción de Subvenciones / Recaudación de Fondos' } },
    { icon: Calendar, title: { en: 'Fundraising / Silent Auction Event Planning', es: 'Planificación de Eventos de Recaudación / Subasta Silenciosa' } },
    { icon: Globe, title: { en: 'Website Development', es: 'Desarrollo de Sitios Web' } }
]

// Additional volunteer activities
const ADDITIONAL_ACTIVITIES = [
    { icon: ShoppingBag, title: { en: 'Providing food and drinks for events & workshops', es: 'Proporcionar comida y bebidas para eventos y talleres' } },
    { icon: Baby, title: { en: 'Providing childcare for trainings', es: 'Proporcionar cuidado infantil para capacitaciones' } },
    { icon: Share2, title: { en: 'Spreading the word about the work', es: 'Difundir información sobre nuestro trabajo' } },
    { icon: Users, title: { en: 'Sign up for the Volunteer Team', es: 'Inscribirse en el Equipo de Voluntarios' } }
]

export default function VolunteerClientPage() {
    const { t, lang } = useLanguage()

    return (
        <div className="bg-[var(--bone)] min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] bg-[var(--forrest)] flex items-center justify-center overflow-hidden pt-32">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--yarrow)] rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--sky)] rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[var(--yarrow)] text-black px-4 py-2 rounded-full mb-6">
                            <Heart className="w-4 h-4" />
                            <span className="font-bold tracking-wide text-xs uppercase">
                                {lang === 'es' ? 'Voluntariado' : 'Volunteer'}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
                            {lang === 'es' ? 'Únete a Nuestra Misión' : 'Join Our Mission'}
                        </h1>
                        <p className="text-[var(--bone)]/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10">
                            {lang === 'es'
                                ? 'Dependemos de vecinos como tú para mantener nuestros programas funcionando. Ya sea que tengas 2 horas o 20, hay un lugar para ti aquí.'
                                : 'We rely on neighbors like you to keep our programs running. Whether you have 2 hours or 20, there is a place for you here.'
                            }
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLScdNXmwTeT1PFjleJRK0szPcDTSVel97Qr6g4nNVz5Ex72sSA/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[var(--yarrow)] text-black px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3"
                            >
                                <span>{lang === 'es' ? 'Únete al Equipo' : 'Join Our Team'}</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:hopehasnoborders@gmail.com"
                                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[var(--forrest)] transition-all inline-flex items-center justify-center gap-3"
                            >
                                <span>{lang === 'es' ? 'Contáctanos' : 'Contact Us'}</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Donate Requested Items Section */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 bg-[var(--forrest)] text-white px-4 py-2 rounded-full mb-6">
                            <Gift className="w-4 h-4" />
                            <span className="font-bold tracking-wide text-xs uppercase">
                                {lang === 'es' ? 'Donar Artículos' : 'Donate Items'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-[var(--forrest)] mb-6">
                            {lang === 'es'
                                ? 'Artículos Solicitados'
                                : 'Requested Items'
                            }
                        </h2>
                        <p className="text-neutral-600 text-lg font-light">
                            {lang === 'es'
                                ? 'Done artículos solicitados para apoyar las necesidades de los participantes en nuestro programa.'
                                : 'Donate requested items to support the needs of participants in our program.'
                            }
                        </p>
                    </motion.div>

                    {/* Items Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {DONATION_NEEDS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[var(--bone)] border-2 border-[var(--forrest)]/10 rounded-xl p-6 hover:border-[var(--yarrow)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-[var(--yarrow)] rounded-lg flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6 text-black" />
                                </div>
                                <h3 className="text-xl font-serif text-[var(--forrest)] mb-2">
                                    {t(item.title)}
                                </h3>
                                <p className="text-neutral-600 text-sm font-light leading-relaxed">
                                    {t(item.items)}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[var(--forrest)] rounded-2xl p-8 md:p-12 text-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                            {lang === 'es'
                                ? 'Para coordinar su donación, envíenos un correo electrónico directamente:'
                                : 'To coordinate your donation, please email us directly:'
                            }
                        </h3>
                        <a
                            href="mailto:hopehasnoborders@gmail.com"
                            className="inline-flex items-center gap-3 bg-[var(--yarrow)] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all"
                        >
                            <Mail className="w-5 h-5" />
                            hopehasnoborders@gmail.com
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Professional Volunteerism Section */}
            <section className="py-20 md:py-32 bg-[var(--bone)]">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 bg-[var(--sky)] text-white px-4 py-2 rounded-full mb-6">
                            <Users className="w-4 h-4" />
                            <span className="font-bold tracking-wide text-xs uppercase">
                                {lang === 'es' ? 'Se Buscan Profesionales' : 'Professionals Needed'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-[var(--forrest)] mb-6">
                            {lang === 'es' ? 'Voluntariado Profesional' : 'Professional Volunteerism'}
                        </h2>
                        <p className="text-neutral-600 text-lg font-light">
                            {lang === 'es'
                                ? 'Usa tus habilidades profesionales para hacer una diferencia.'
                                : 'Use your professional skills to make a difference.'
                            }
                        </p>
                    </motion.div>

                    {/* Professional Opportunities Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {PROFESSIONAL_OPPORTUNITIES.map((opp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white border-2 border-[var(--forrest)]/10 rounded-xl p-6 flex items-center gap-4 hover:border-[var(--sky)] hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-[var(--sky)] rounded-xl flex items-center justify-center flex-shrink-0">
                                    <opp.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-serif text-[var(--forrest)]">
                                    {t(opp.title)}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Activities */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl p-8 md:p-12 border-2 border-[var(--forrest)]/10"
                    >
                        <h3 className="text-2xl font-serif text-[var(--forrest)] mb-6 text-center">
                            {lang === 'es'
                                ? 'Otras Formas de Ayudar'
                                : 'Other Ways to Help'
                            }
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {ADDITIONAL_ACTIVITIES.map((activity, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-[var(--bone)] rounded-lg">
                                    <activity.icon className="w-5 h-5 text-[var(--yarrow)]" />
                                    <span className="text-neutral-700 font-light">
                                        {t(activity.title)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="text-center mt-8 text-neutral-600">
                            {lang === 'es'
                                ? 'Síguenos en Facebook para oportunidades específicas.'
                                : 'Follow us on Facebook for specific opportunities.'
                            }
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Join Volunteer Team CTA */}
            <section className="py-20 md:py-32 bg-[var(--forrest)]">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <Heart className="w-16 h-16 text-[var(--yarrow)] mx-auto mb-8" />
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                            {lang === 'es'
                                ? 'Únete a Nuestro Equipo de Voluntarios'
                                : 'Join Our Volunteer Team'
                            }
                        </h2>
                        <p className="text-[var(--bone)]/80 text-lg font-light mb-10 max-w-2xl mx-auto">
                            {lang === 'es'
                                ? 'Completa nuestro formulario de interés para voluntarios y nos pondremos en contacto contigo.'
                                : 'Fill out our volunteer interest form and we will be in touch with you.'
                            }
                        </p>
                        <a
                            href="https://forms.gle/your-volunteer-form"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[var(--yarrow)] text-black px-12 py-6 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white transition-all shadow-lg hover:shadow-xl"
                        >
                            <span>{lang === 'es' ? 'Únete al Equipo de Voluntarios' : 'Join Our Volunteer Team'}</span>
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Related Pages */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <Link
                            href="/hosthomes"
                            className="group bg-[var(--bone)] border-2 border-[var(--forrest)]/10 rounded-xl p-8 hover:border-[var(--yarrow)] hover:shadow-xl transition-all duration-300"
                        >
                            <h3 className="text-2xl font-serif text-[var(--forrest)] mb-2 group-hover:text-black transition-colors">
                                {lang === 'es' ? 'Hogares Anfitriones' : 'Host Homes'}
                            </h3>
                            <p className="text-neutral-600 font-light mb-4">
                                {lang === 'es'
                                    ? 'Aprende cómo puedes abrir tu hogar para una familia.'
                                    : 'Learn how you can open your home to a family.'
                                }
                            </p>
                            <span className="text-[var(--yarrow)] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                                {lang === 'es' ? 'Más Información' : 'Learn More'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                        <Link
                            href="/collaborate"
                            className="group bg-[var(--bone)] border-2 border-[var(--forrest)]/10 rounded-xl p-8 hover:border-[var(--yarrow)] hover:shadow-xl transition-all duration-300"
                        >
                            <h3 className="text-2xl font-serif text-[var(--forrest)] mb-2 group-hover:text-black transition-colors">
                                {lang === 'es' ? 'Colaborar' : 'Collaborate'}
                            </h3>
                            <p className="text-neutral-600 font-light mb-4">
                                {lang === 'es'
                                    ? 'Asociarse con nosotros para un mayor impacto comunitario.'
                                    : 'Partner with us for greater community impact.'
                                }
                            </p>
                            <span className="text-[var(--yarrow)] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                                {lang === 'es' ? 'Más Información' : 'Learn More'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-[var(--bone)] border-t border-[var(--forrest)]/10">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-neutral-600 font-light mb-4">
                        {lang === 'es' ? '¿Preguntas? Contáctanos:' : 'Questions? Contact us:'}
                    </p>
                    <a
                        href="mailto:hopehasnoborders@gmail.com"
                        className="text-[var(--forrest)] font-bold text-lg hover:text-[var(--yarrow)] transition-colors"
                    >
                        hopehasnoborders@gmail.com
                    </a>
                </div>
            </section>
        </div>
    )
}
