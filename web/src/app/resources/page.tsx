import { getClient } from '@/lib/sanity'
import { resourcesPageQuery, siteSettingsQuery } from '@/lib/queries'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Hero } from '@/components/sections/Hero'
import ClientTranslations from '../ClientTranslations'
import { ExternalLink, Home, Heart, Scale, MapPin, Phone, Mail } from 'lucide-react'
import { draftMode } from 'next/headers'

export const revalidate = 60

const IconMap: any = {
    home: Home,
    heart: Heart,
    scale: Scale,
    mapPin: MapPin,
    phone: Phone,
    mail: Mail,
}

async function getResourcesData() {
    const draft = await draftMode()
    const [page, siteSettings] = await Promise.all([
        getClient(draft.isEnabled).fetch(resourcesPageQuery),
        getClient(draft.isEnabled).fetch(siteSettingsQuery)
    ])
    return { page, siteSettings }
}

export async function generateMetadata(): Promise<Metadata> {
    const draft = await draftMode()
    const { page, siteSettings } = await getResourcesData()
    return generatePageMetadata(page, siteSettings, 'en')
}

export default async function ResourcesPage() {
    const { page } = await getResourcesData()

    return (
        <div className="bg-white pb-24 min-h-screen">
            <Hero hero={page.hero} />

            <div className="container mx-auto px-6 py-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {page.resources?.map((resource: any, i: number) => {
                        const Icon = IconMap[resource.icon] || ExternalLink
                        return (
                            <a
                                key={i}
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-8 border border-neutral-100 hover:border-[#FFB81C] hover:shadow-xl transition-all duration-300 flex flex-col items-start rounded-sm bg-white"
                            >
                                <div className="w-12 h-12 bg-orange-50 rounded-sm flex items-center justify-center mb-6 group-hover:bg-[#FFB81C] transition-colors">
                                    <Icon className="text-[#FFB81C] group-hover:text-white w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-serif text-neutral-900 mb-2 antialiased">
                                    <ClientTranslations en={resource.title.en} es={resource.title.es} />
                                </h3>
                                <p className="text-neutral-500 font-light text-sm mb-6 leading-relaxed flex-1">
                                    <ClientTranslations en={resource.description.en} es={resource.description.es} />
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#FFB81C]">
                                    <ClientTranslations en="Visit Resource" es="Visitar Recurso" />
                                    <ExternalLink size={12} />
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
