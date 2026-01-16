'use client'

import { useLanguage } from '@/lib/LanguageContext'

interface VideoSectionProps {
    video: {
        label: { en: string; es: string }
        title: { en: string; es: string }
        videoUrl: string
        donateText: { en: string; es: string }
    } | null
}

export function VideoSection({ video }: VideoSectionProps) {
    const { t } = useLanguage()

    if (!video) return null

    return (
        <section className="py-32 bg-black text-white text-center border-t border-neutral-900">
            <div className="container mx-auto px-6 max-w-4xl">
                <span className="text-[#FFB81C] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
                    {t(video.label)}
                </span>
                <h2 className="text-3xl md:text-5xl font-serif mb-12 leading-tight antialiased">
                    {t(video.title)}
                </h2>

                <div className="relative w-full aspect-video bg-neutral-900 mb-12 overflow-hidden rounded-sm shadow-2xl border border-neutral-800 group">
                    <iframe
                        className="w-full h-full"
                        src={video.videoUrl}
                        title="Hope Has No Borders Mission Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                <button className="inline-block bg-[#FFB81C] text-black px-12 py-5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
                    {t(video.donateText)}
                </button>
            </div>
        </section>
    )
}
