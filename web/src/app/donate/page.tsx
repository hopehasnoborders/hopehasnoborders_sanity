import { getClient } from '@/lib/sanity'
import { donatePageQuery, siteSettingsQuery } from '@/lib/queries'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Hero } from '@/components/sections/Hero'
import ClientTranslations from '../ClientTranslations'
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { draftMode } from 'next/headers'

export const revalidate = 60

async function getDonateData() {
    const draft = await draftMode()
    const [page, siteSettings] = await Promise.all([
        getClient(draft.isEnabled).fetch(donatePageQuery),
        getClient(draft.isEnabled).fetch(siteSettingsQuery)
    ])
    return { page, siteSettings }
}

export async function generateMetadata(): Promise<Metadata> {
    const draft = await draftMode()
    const { page, siteSettings } = await getDonateData()
    return generatePageMetadata(page, siteSettings, 'en')
}

export default async function DonatePage() {
    const { page } = await getDonateData()

    return (
        <div className="bg-white pb-24 min-h-screen">
            <Hero hero={page.hero} />

            <div className="container mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center">
                                <Heart className="text-[#FFB81C] w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-serif text-neutral-900 antialiased">
                                <ClientTranslations en="Support Our Work" es="Apoya Nuestro Trabajo" />
                            </h2>
                        </div>

                        <p className="text-neutral-600 font-light text-lg mb-12 leading-relaxed antialiased">
                            <ClientTranslations
                                en="Your donation directly funds housing programs, legal aid, and immediate humanitarian relief for families in Denver."
                                es="Su donación financia directamente programas de vivienda, ayuda legal y socorro humanitario inmediato para familias en Denver."
                            />
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-12">
                            {(page.amounts || ['$25', '$50', '$100', '$250']).map((amount: string) => (
                                <button key={amount} className="p-6 border border-neutral-200 text-neutral-900 font-serif text-2xl hover:border-[#FFB81C] hover:bg-orange-50/30 transition-all text-center">
                                    {amount}
                                </button>
                            ))}
                        </div>

                        <button className="w-full bg-[#FFB81C] text-black py-6 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-900 hover:text-white transition-all shadow-lg">
                            <ClientTranslations en="Donate Custom Amount" es="Donar Cantidad Personalizada" />
                        </button>
                    </div>

                    {page.featuredProduct && (
                        <div className="bg-neutral-50 p-12 rounded-sm border border-neutral-100 flex flex-col md:flex-row gap-10 items-center">
                            <div className="w-full md:w-1/2 aspect-square bg-white shadow-xl rounded-sm overflow-hidden border border-neutral-100 group">
                                {page.featuredProduct.image && (
                                    <img
                                        src={urlFor(page.featuredProduct.image).width(600).url()}
                                        alt={page.featuredProduct.title?.en}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                )}
                            </div>
                            <div className="w-full md:w-1/2">
                                <span className="bg-[#FFB81C] text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 mb-6 inline-block">
                                    <ClientTranslations en="Support & Style" es="Apoyo y Estilo" />
                                </span>
                                <h3 className="text-3xl font-serif text-neutral-900 mb-2 antialiased">
                                    <ClientTranslations en={page.featuredProduct.title?.en} es={page.featuredProduct.title?.es} />
                                </h3>
                                <p className="text-[#FFB81C] font-serif text-xl mb-4">{page.featuredProduct.price}</p>
                                <p className="text-neutral-500 font-light text-sm mb-8 leading-relaxed">
                                    <ClientTranslations en={page.featuredProduct.description?.en} es={page.featuredProduct.description?.es} />
                                </p>
                                <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-neutral-900 group">
                                    <ClientTranslations en="Get the Bag" es="Obtener el Bolso" />
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
