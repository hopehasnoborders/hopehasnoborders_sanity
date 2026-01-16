import { getClient } from '@/lib/sanity'
import { aboutPageQuery, siteSettingsQuery } from '@/lib/queries'
import { Check } from 'lucide-react'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import ClientTranslations from '../ClientTranslations'
import { Hero } from '@/components/sections/Hero'
import { draftMode } from 'next/headers'

export const revalidate = 60

async function getAboutData() {
    const draft = await draftMode()
    const [page, siteSettings] = await Promise.all([
        getClient(draft.isEnabled).fetch(aboutPageQuery),
        getClient(draft.isEnabled).fetch(siteSettingsQuery)
    ])
    return { page, siteSettings }
}

export async function generateMetadata(): Promise<Metadata> {
    const draft = await draftMode()
    const { page, siteSettings } = await getAboutData()
    return generatePageMetadata(page, siteSettings, 'en')
}

export default async function AboutPage() {
    const { page } = await getAboutData()

    return (
        <div className="bg-white pb-24 min-h-screen">
            <Hero hero={page.hero} />

            <div className="container mx-auto px-6 py-24">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg prose-neutral max-w-none text-neutral-800 font-light mb-20 leading-relaxed antialiased">
                        <ClientTranslations
                            en={<p>Hope Has No Borders began in 2023 as a grassroots response to the humanitarian crisis in Denver. What started as a few neighbors collecting coats has grown into a comprehensive support network.</p>}
                            es={<p>Hope Has No Borders comenzó en 2023 como una respuesta comunitaria a la crisis humanitaria en Denver. Lo que comenzó como unos pocos vecinos recolectando abrigos se ha convertido en una red de apoyo integral.</p>}
                        />
                        <ClientTranslations
                            en={<p>We believe in a clients-first approach. Every decision we make prioritizes the dignity and immediate needs of the families we serve.</p>}
                            es={<p>Creemos en un enfoque centrado en los clientes. Cada decisión que tomamos prioriza la dignidad y las necesidades inmediatas de las familias a las que servimos.</p>}
                        />
                    </div>

                    {page?.mission && (
                        <div className="my-20 p-12 bg-neutral-50 border-l-4 border-[#FFB81C] relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100/50 rounded-full blur-3xl"></div>
                            <span className="text-[#FFB81C] font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block relative z-10">
                                <ClientTranslations en="Our Mission" es="Nuestra Misión" />
                            </span>
                            <h3 className="text-3xl md:text-4xl font-serif text-black mb-0 italic leading-snug relative z-10 antialiased">
                                <ClientTranslations en={`"${page.mission.en}"`} es={`"${page.mission.es}"`} />
                            </h3>
                        </div>
                    )}

                    <div className="mt-24">
                        <span className="text-[#FFB81C] font-bold tracking-[0.2em] text-[10px] uppercase mb-6 block">
                            <ClientTranslations en="Our Core Values" es="Nuestros Valores Fundamentales" />
                        </span>
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            {(page?.values || []).map((val: any, i: number) => (
                                <div key={i} className="flex items-start gap-4 bg-white border border-neutral-100 p-8 hover:border-[#FFB81C] transition-colors shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-1">
                                        <Check className="text-[#FFB81C] w-3 h-3" strokeWidth={3} />
                                    </div>
                                    <span className="text-xl font-serif text-neutral-900 antialiased">
                                        <ClientTranslations en={val.value.en} es={val.value.es} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
