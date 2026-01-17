import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './helpers/i18n'
import { seoFields } from './objects/seo'

export default defineType({
    name: 'pageHome',
    title: '🏠 Home Page',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'stats', title: 'Stats Bar' },
        { name: 'impact', title: 'Impact Section' },
        { name: 'services', title: 'Services Section' },
        { name: 'testimonials', title: 'Testimonials Section' },
        { name: 'seo', title: '🔍 SEO' },
    ],
    fields: [
        // HERO
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            group: 'hero',
            fields: [
                i18nString('tagline', 'Tagline (small text above headline)'),
                i18nString('title', 'Main Headline'),
                i18nText('subtitle', 'Subtitle/Description'),
                defineField({
                    name: 'image',
                    title: 'Background Image',
                    type: 'image',
                    options: { hotspot: true },
                }),
                defineField({
                    name: 'primaryButton',
                    title: 'Primary Button',
                    type: 'object',
                    fields: [
                        i18nString('text', 'Button Text'),
                        defineField({ name: 'link', title: 'Link', type: 'string' }),
                    ],
                }),
                defineField({
                    name: 'secondaryButton',
                    title: 'Secondary Button',
                    type: 'object',
                    fields: [
                        i18nString('text', 'Button Text'),
                        defineField({ name: 'link', title: 'Link', type: 'string' }),
                    ],
                }),
            ],
        }),

        // IMPACT SECTION
        defineField({
            name: 'impactSection',
            title: 'Impact Section',
            type: 'object',
            group: 'impact',
            fields: [
                i18nString('title', 'Section Title'),
                i18nText('subtitle', 'Section Subtitle'),
                // Key Metrics Grid
                defineField({
                    name: 'keyMetrics',
                    title: 'Key Metrics Grid',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'value', title: 'Value (Number)', type: 'number' }),
                            defineField({ name: 'prefix', title: 'Prefix (e.g. $)', type: 'string' }),
                            defineField({ name: 'suffix', title: 'Suffix (e.g. %)', type: 'string' }),
                            i18nString('label', 'Label'),
                        ],
                        preview: {
                            select: { title: 'label.en', subtitle: 'value' }
                        }
                    }],
                    validation: Rule => Rule.max(4)
                }),
                // Outcome Metrics Strip
                defineField({
                    name: 'outcomeMetrics',
                    title: 'Outcome Metrics Strip',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'value', title: 'Value (String, e.g. 78%)', type: 'string' }),
                            i18nString('label', 'Label'),
                        ],
                        preview: {
                            select: { title: 'label.en', subtitle: 'value' }
                        }
                    }]
                }),
                // Programs List
                defineField({
                    name: 'programs',
                    title: 'Impact Programs',
                    type: 'array',
                    description: 'Select programs to feature in the Impact Section',
                    of: [{ type: 'reference', to: [{ type: 'program' }] }]
                }),
                // Testimonials
                defineField({
                    name: 'testimonials',
                    title: 'Voices of Impact',
                    type: 'array',
                    description: 'Select testimonials for the carousel',
                    of: [{ type: 'reference', to: [{ type: 'testimonial' }] }]
                }),
                // Closing CTA
                defineField({
                    name: 'closingCTA',
                    title: 'Closing CTA',
                    type: 'object',
                    fields: [
                        i18nString('text', 'Button Text'),
                        defineField({ name: 'link', title: 'Button Link', type: 'string' }),
                        i18nString('message', 'Message (e.g. "We couldn\'t do this without your support")')
                    ]
                })
            ]
        }),

        // STATS
        defineField({
            name: 'stats',
            title: 'Stats Bar / ImpactSnapshot',
            type: 'array',
            group: 'stats',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'value', title: 'Numeric Value (e.g. 320)', type: 'number' }),
                    i18nString('label', 'Label'),
                ],
                preview: {
                    select: { title: 'value', subtitle: 'label.en' },
                },
            }],
        }),

        // VIDEO SECTION
        defineField({
            name: 'videoSection',
            title: 'Video Section',
            type: 'object',
            fields: [
                i18nString('label', 'Top Small Label (e.g. "See Our Impact")'),
                i18nString('title', 'Headline / Quote'),
                defineField({ name: 'videoUrl', title: 'YouTube Embed URL', type: 'url' }),
                i18nString('donateText', 'Donate Button Text'),
            ],
        }),

        // SERVICES SECTION
        defineField({
            name: 'servicesSection',
            title: 'Services Section Header',
            type: 'object',
            group: 'services',
            fields: [
                i18nString('eyebrow', 'Eyebrow Text (e.g. "What We Do")'),
                i18nString('title', 'Section Title'),
                i18nText('subtitle', 'Section Subtitle'),
            ],
        }),

        // TESTIMONIALS SECTION
        defineField({
            name: 'testimonialSection',
            title: 'Testimonials Section Header',
            type: 'object',
            group: 'testimonials',
            fields: [
                i18nString('eyebrow', 'Eyebrow Text'),
                i18nString('title', 'Section Title'),
                i18nText('subtitle', 'Section Subtitle'),
            ],
        }),

        ...seoFields,
    ],
    preview: {
        prepare() {
            return { title: 'Home Page' }
        },
    },
})
