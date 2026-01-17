'use client'

import { useState } from 'react'
import { resourceCategories } from '@/data/resources'
import { ResourcesHero } from './ResourcesHero'
import { IntentTiles } from './IntentTiles'
import { ResourceSearch } from './ResourceSearch'
import { ResourceGroup } from './ResourceGroup'
import { useLanguage } from '@/lib/LanguageContext'

export function ResourcesClientPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedIds, setExpandedIds] = useState<string[]>(['general']) // Default open first one
    const { t } = useLanguage()

    const toggleCategory = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        )
    }

    const handleCategorySelect = (id: string) => {
        if (!expandedIds.includes(id)) {
            setExpandedIds(prev => [...prev, id])
        }
        // Small timeout to allow state update/rendering to happen before scroll if needed
        setTimeout(() => {
            const element = document.getElementById(id)
            if (element) {
                const headerOffset = 100
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.scrollY - headerOffset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                })
            }
        }, 50)
    }

    // Filter resources
    const filteredCategories = resourceCategories.map(cat => {
        // If no search, return category as is
        if (!searchQuery) return cat

        const query = searchQuery.toLowerCase()

        // Check if category title matches
        const titleMatch = t(cat.title).toLowerCase().includes(query)
        if (titleMatch) return cat

        // Filter resources inside category
        const matchingResources = cat.resources.filter(res => {
            return (
                t(res.title).toLowerCase().includes(query) ||
                t(res.description).toLowerCase().includes(query) ||
                (res.tags && res.tags.some(tag => tag.toLowerCase().includes(query)))
            )
        })

        // Return category only if it has matching resources
        if (matchingResources.length > 0) {
            return { ...cat, resources: matchingResources }
        }

        return null
    }).filter(Boolean) as typeof resourceCategories

    return (
        <main className="bg-white min-h-screen pb-24">
            <ResourcesHero />

            <IntentTiles onCategorySelect={handleCategorySelect} />

            <div className="container mx-auto px-6 relative z-10">
                <ResourceSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <div className="max-w-4xl mx-auto border-t border-neutral-200">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, i) => (
                            <ResourceGroup
                                key={category.id}
                                category={category}
                                isOpen={expandedIds.includes(category.id) || !!searchQuery}
                                onToggle={() => toggleCategory(category.id)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 text-neutral-400 font-light">
                            {t({ en: "No resources found matching your search.", es: "No se encontraron recursos que coincidan con su búsqueda." })}
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-6 mt-32 text-center text-neutral-400 text-sm font-light">
                <p>{t({
                    en: "If you know of a valuable resource that should be included, we’d love to hear from you!",
                    es: "Si conoce un recurso valioso que debería incluirse, ¡nos encantaría saber de usted!"
                })}</p>
                <a href="mailto:hopehasnoborders@gmail.com" className="text-[var(--yarrow)] font-bold mt-2 inline-block hover:underline">
                    hopehasnoborders@gmail.com
                </a>
            </div>
        </main>
    )
}
