'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { AlertCircle, Scale, GraduationCap, Users, LucideIcon } from 'lucide-react'

interface Intent {
    icon: LucideIcon
    label: { en: string; es: string }
    description: { en: string; es: string }
    targetId: string
    color: string
}

const intents: Intent[] = [
    {
        icon: AlertCircle,
        label: { en: "Get Help Now", es: "Obtener Ayuda Ahora" },
        description: { en: "Emergency aid, housing, food", es: "Ayuda de emergencia, vivienda, comida" },
        targetId: "general",
        color: "bg-red-50 text-red-600 border-red-100 ring-red-200"
    },
    {
        icon: Scale,
        label: { en: "Legal Rights", es: "Derechos Legales" },
        description: { en: "Legal aid, policies, how-tos", es: "Asistencia legal, políticas, guías" },
        targetId: "legal",
        color: "bg-blue-50 text-blue-600 border-blue-100 ring-blue-200"
    },
    {
        icon: GraduationCap,
        label: { en: "Education", es: "Educación" },
        description: { en: "Guides, tools, language", es: "Guías, herramientas, idioma" },
        targetId: "guides",
        color: "bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-200"
    },
    {
        icon: Users,
        label: { en: "Partners", es: "Aliados" },
        description: { en: "For volunteers & orgs", es: "Para voluntarios y organizaciones" },
        targetId: "employment",
        color: "bg-purple-50 text-purple-600 border-purple-100 ring-purple-200"
    }
]

export function IntentTiles({ onCategorySelect }: { onCategorySelect: (id: string) => void }) {
    const { t } = useLanguage()

    return (
        <div id="intent-tiles" className="container mx-auto px-6 -mt-16 relative z-30 mb-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {intents.map((intent, i) => {
                    const Icon = intent.icon
                    return (
                        <button
                            key={i}
                            onClick={() => onCategorySelect(intent.targetId)}
                            className={`p-8 rounded-sm bg-white border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group`}
                        >
                            <div className={`w-12 h-12 rounded-full ${intent.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                <Icon size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-neutral-900 mb-2">
                                {t(intent.label)}
                            </h3>
                            <p className="text-sm text-neutral-500 font-light">
                                {t(intent.description)}
                            </p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
