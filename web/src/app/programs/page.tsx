import { getClient } from '@/lib/sanity'
import { programsPageQuery, allProgramsQuery, siteSettingsQuery } from '@/lib/queries'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Hero, ProgramsGrid } from '@/components/sections'
import { draftMode } from 'next/headers'

export const revalidate = 60

async function getProgramsData() {
    const draft = await draftMode()
    const [page, programs, siteSettings] = await Promise.all([
        getClient(draft.isEnabled).fetch(programsPageQuery),
        getClient(draft.isEnabled).fetch(allProgramsQuery),
        getClient(draft.isEnabled).fetch(siteSettingsQuery)
    ])
    return { page, programs, siteSettings }
}

export async function generateMetadata(): Promise<Metadata> {
    const draft = await draftMode()
    const { page, siteSettings } = await getProgramsData()
    return generatePageMetadata(page, siteSettings, 'en')
}

export default async function ProgramsPage() {
    const { page, programs } = await getProgramsData()

    return (
        <div className="bg-white min-h-screen">
            <Hero hero={page.hero} />
            <ProgramsGrid
                header={{
                    eyebrow: { en: 'Our Impact', es: 'Nuestro Impacto' },
                    title: { en: 'Comprehensive Support', es: 'Apoyo Integral' },
                    subtitle: page.hero.subtitle
                }}
                programs={programs}
            />
        </div>
    )
}
