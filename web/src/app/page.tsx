import { sanityFetch } from '@/lib/sanity.server'
import { homePageQuery, allProgramsQuery, allTestimonialsQuery, siteSettingsQuery } from '@/lib/queries'
import { Hero, VideoSection, ProgramsGrid, ImpactSection, Testimonials } from '@/components/sections'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import ClientTranslations from './ClientTranslations'
import { generatePageMetadata } from '@/lib/seo'
import { Metadata } from 'next'

async function getHomeData() {
  const [home, programs, testimonials, siteSettings] = await Promise.all([
    sanityFetch({ query: homePageQuery, tags: ['home', 'settings'] }),
    sanityFetch({ query: allProgramsQuery, tags: ['programs'] }),
    sanityFetch({ query: allTestimonialsQuery, tags: ['testimonials'] }),
    sanityFetch({ query: siteSettingsQuery, tags: ['settings'] })
  ]) as [any, any, any, any]
  return { home, programs, testimonials, siteSettings }
}

export async function generateMetadata(): Promise<Metadata> {
  const [home, siteSettings] = await Promise.all([
    sanityFetch({ query: homePageQuery, tags: ['home'] }),
    sanityFetch({ query: siteSettingsQuery, tags: ['settings'] })
  ]) as [any, any]
  return generatePageMetadata(home, siteSettings, 'en')
}

export default async function Home() {
  const { home, programs, testimonials } = await getHomeData()
  console.log('HOME DATA HERO:', JSON.stringify(home?.hero, null, 2))

  return (
    <div className="flex flex-col">
      <Hero hero={home?.hero} />

      <ImpactSection data={home?.impactSection} />

      <VideoSection video={home?.videoSection} />

      <ProgramsGrid
        header={home?.servicesSection}
        programs={programs}
      />

      {/* CTA Block */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-6 text-center">
          <ClientTranslations
            en={<h2 className="text-3xl md:text-4xl font-serif mb-12 text-neutral-900 antialiased text-balance leading-tight">How can we help you today?</h2>}
            es={<h2 className="text-3xl md:text-4xl font-serif mb-12 text-neutral-900 antialiased text-balance leading-tight">¿Cómo podemos ayudarte hoy?</h2>}
          />
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link href="/resources" className="bg-white border border-neutral-200 px-10 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-black hover:text-white hover:border-black transition-all text-center">
              <ClientTranslations en="I Need Help" es="Necesito Ayuda" />
            </Link>
            <Link href="/volunteer" className="bg-white border border-neutral-200 px-10 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-black hover:text-white hover:border-black transition-all text-center">
              <ClientTranslations en="I Want to Volunteer" es="Quiero Ser Voluntario" />
            </Link>
            <Link href="/donate" className="bg-[#FFB81C] border border-[#FFB81C] text-black px-10 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-black hover:text-white hover:border-black transition-all shadow-lg hover:shadow-xl text-center">
              <ClientTranslations en="I Want to Donate" es="Quiero Donar" />
            </Link>
          </div>
        </div>
      </section>

      <ImpactSection stats={home?.stats} />

      <Testimonials testimonials={testimonials} />

      {/* Mission Footer Quote */}
      <div className="container mx-auto px-6 max-w-4xl text-center py-32">
        <Heart className="w-8 h-8 text-[#FFB81C] mx-auto mb-10 animate-pulse" />
        <h2 className="text-3xl md:text-5xl font-serif leading-snug text-neutral-900 mb-10 text-balance antialiased">
          <ClientTranslations
            en='"To provide humanitarian aid and support to immigrants and asylum seekers, fostering a community where everyone has the opportunity to thrive."'
            es='"Brindar ayuda humanitaria y apoyo a inmigrantes y solicitantes de asilo, fomentando una comunidad donde todos tengan la oportunidad de prosperar."'
          />
        </h2>
      </div>
    </div>
  )
}
