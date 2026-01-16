import { Metadata } from 'next'
import { urlFor } from './sanity'

interface SEOProps {
    title?: { en: string; es: string }
    description?: { en: string; es: string }
    ogImage?: any
    noIndex?: boolean
}

interface SiteSettings {
    title: { en: string; es: string }
    description: { en: string; es: string }
    ogImage?: any
}

export function generatePageMetadata(
    pageData: any,
    siteSettings: SiteSettings,
    lang: 'en' | 'es' = 'en'
): Metadata {
    const seo = pageData?.seo || {}

    const title = (seo.metaTitle?.[lang] || pageData?.hero?.title?.[lang] || siteSettings.title?.[lang])
    const description = (seo.metaDescription?.[lang] || pageData?.hero?.subtitle?.[lang] || siteSettings.description?.[lang])
    const image = seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() :
        siteSettings.ogImage ? urlFor(siteSettings.ogImage).width(1200).height(630).url() : null

    return {
        title: `${title} | Hope Has No Borders`,
        description: description,
        robots: seo.noIndex ? 'noindex, nofollow' : 'index, follow',
        openGraph: {
            title: title,
            description: description,
            images: image ? [{ url: image }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: image ? [image] : [],
        },
    }
}
