import { getClient } from '@/lib/sanity'
import { storiesPageQuery, siteSettingsQuery } from '@/lib/queries'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Hero, Testimonials } from '@/components/sections'
import { allTestimonialsQuery } from '@/lib/queries'
import { draftMode } from 'next/headers'

export const revalidate = 60

async function getStoriesData() {
    const draft = await draftMode()
    const [page, testimonials, siteSettings] = await Promise.all([
        getClient(draft.isEnabled).fetch(storiesPageQuery),
        getClient(draft.isEnabled).fetch(allTestimonialsQuery),
        getClient(draft.isEnabled).fetch(siteSettingsQuery)
    ])
    return { page, testimonials, siteSettings }
}

export async function generateMetadata(): Promise<Metadata> {
    const draft = await draftMode()
    const { page, siteSettings } = await getStoriesData()
    return generatePageMetadata(page, siteSettings, 'en')
}

export default async function StoriesPage() {
    const { page, testimonials } = await getStoriesData()

    return (
        <div className="bg-white min-h-screen">
            <Hero hero={page.hero} />
            <Testimonials testimonials={testimonials} />

            <div className="container mx-auto px-6 py-24 max-w-4xl text-center">
                <p className="text-neutral-400 font-serif italic text-xl antialiased">
                    More stories of resilience and hope coming soon as we continue our mission.
                </p>
            </div>
        </div>
    )
}
