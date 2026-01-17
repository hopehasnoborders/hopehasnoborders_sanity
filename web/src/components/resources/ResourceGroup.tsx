'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Home, Scale, Users, Heart, Book, Briefcase, Car, Brain, GraduationCap } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { ResourceCategory } from '@/data/resources'
import { ResourceCard } from './ResourceCard'

const IconMap: any = {
    home: Home,
    scale: Scale,
    users: Users,
    heart: Heart,
    book: Book,
    briefcase: Briefcase,
    car: Car,
    med: Heart, // Reusing heart if med not customized
    brain: Brain,
    grad: GraduationCap
}

export function ResourceGroup({
    category,
    isOpen,
    onToggle
}: {
    category: ResourceCategory,
    isOpen: boolean,
    onToggle: () => void
}) {
    const { t } = useLanguage()
    const Icon = IconMap[category.icon] || Home

    return (
        <div id={category.id} className="border-b border-neutral-200 last:border-0 scroll-mt-32">
            <button
                onClick={onToggle}
                className={`w-full py-8 flex items-center justify-between group hover:bg-neutral-50 transition-colors px-4 rounded-sm ${isOpen ? 'bg-neutral-50' : ''}`}
            >
                <div className="flex items-center gap-6">
                    <div className={`p-3 rounded-full bg-neutral-100 text-neutral-500 group-hover:bg-[var(--yarrow)] group-hover:text-white transition-all duration-300`}>
                        <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="text-left">
                        <h2 className="text-2xl font-serif text-neutral-900 group-hover:translate-x-1 transition-transform duration-300">
                            {t(category.title)}
                        </h2>
                        <p className="text-neutral-400 text-sm font-light mt-1">
                            {category.resources.length} {t({ en: "Resources available", es: "Recursos disponibles" })}
                        </p>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="text-neutral-300 group-hover:text-black transition-colors" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                            {category.resources.map((resource, idx) => (
                                <ResourceCard key={idx} resource={resource} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
