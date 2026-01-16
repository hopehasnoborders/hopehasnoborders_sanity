import { getClient } from '@/lib/sanity'
import { volunteerPageQuery, siteSettingsQuery } from '@/lib/queries'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Hero } from '@/components/sections/Hero'
import ClientTranslations from '../ClientTranslations'
import { Heart, ArrowRight } from 'lucide-react'
import { draftMode } from 'next/headers'

export const revalidate = 60

async function getVolunteerData() {
    const draft = await draftMode()
    const [page, siteSettings] = await Promise.all([
        getClient(draft.isEnabled).fetch(volunteerPageQuery),
        getClient(draft.isEnabled).fetch(siteSettingsQuery)
    ])
    return { page, siteSettings }
}

export async function generateMetadata(): Promise<Metadata> {
    const draft = await draftMode()
    const { page, siteSettings } = await getVolunteerData()
    return generatePageMetadata(page, siteSettings, 'en')
}

export default async function VolunteerPage() {
    const { page } = await getVolunteerData()

    return (
        <div className="bg-white pb-24 min-h-screen">
            <Hero hero={page.hero} />

            <div className="container mx-auto px-6 py-24 max-w-5xl">
                <div className="text-center mb-20">
                    <Heart className="w-10 h-10 text-[#FFB81C] mx-auto mb-6" />
                    <h2 className="text-4xl font-serif text-neutral-900 mb-6 antialiased">
                        <ClientTranslations en="Join Our Mission" es="Únete a Nuestra Misión" />
                    </h2>
                    <p className="text-neutral-500 font-light max-w-2xl mx-auto leading-relaxed">
                        <ClientTranslations
                            en="We rely on neighbors like you to keep our programs running. Whether you have 2 hours or 20, there is a place for you here."
                            es="Dependemos de vecinos como usted para mantener nuestros programas en funcionamiento. Ya sea que tenga 2 horas o 20, hay un lugar para usted aquí."
                        />
                    </p>
                </div>

                <div className="space-y-6">
                    {page.opportunities?.map((opp: any, i: number) => (
                        <div key={i} className="p-8 border border-neutral-100 hover:border-l-4 hover:border-l-[#FFB81C] transition-all bg-neutral-50/50 flex flex-col md:flex-row md:items-center justify-between gap-8 group">
                            <div className="max-w-xl">
                                <h3 className="text-2xl font-serif text-neutral-900 mb-2 antialiased">
                                    <ClientTranslations en={opp.title.en} es={opp.title.es} />
                                </h3>
                                <p className="text-neutral-600 font-light text-sm leading-relaxed">
                                    <ClientTranslations en={opp.description.en} es={opp.description.es} />
                                </p>
                            </div>
                            <button className="bg-neutral-900 text-white px-8 py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-[#FFB81C] transition-colors flex items-center gap-3">
                                <ClientTranslations en="Apply to Volunteer" es="Postular como Voluntario" />
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-32 text-center p-16 bg-neutral-900 text-white rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#FFB81C]"></div>
                    <h3 className="text-3xl font-serif mb-8 antialiased text-balance">
                        <ClientTranslations
                            en="Can't volunteer? Support us financially."
                            es="¿No puedes ser voluntario? Apóyanos financieramente."
                        />
                    </h3>
                    <a href="/donate" className="inline-block border border-[#FFB81C] text-[#FFB81C] px-12 py-5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#FFB81C] hover:text-black transition-all">
                        <ClientTranslations en="Make a Donation" es="Hacer una Donación" />
                    </a>
                </div>
            </div>
        </div>
    )
}
