import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './helpers/i18n'

export default defineType({
    name: 'program',
    title: '📦 Program',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'config', title: 'Configuration' },
    ],
    fields: [
        i18nString('title', 'Program Title', 'content'),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: { source: 'title.en', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        i18nText('summary', 'Short Summary (for cards)', 'content'),
        i18nText('description', 'Full Description', 'content'),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            group: 'content',
            description: 'Icon name from Lucide icons',
            options: {
                list: [
                    { title: '🏠 Home', value: 'home' },
                    { title: '⚖️ Scale (Legal)', value: 'scale' },
                    { title: '👥 Users (Community)', value: 'users' },
                    { title: '❤️ Heart', value: 'heart' },
                    { title: '📚 Book', value: 'book' },
                    { title: '🚗 Car', value: 'car' },
                ],
            },
        }),
        defineField({
            name: 'image',
            title: 'Program Image',
            type: 'image',
            group: 'content',
            options: { hotspot: true },
            description: 'Image used in the Impact Section panels',
        }),
        defineField({
            name: 'impactMetrics',
            title: 'Impact Metrics',
            type: 'array',
            group: 'content',
            description: 'Key statistics for this program (e.g. "667 people supported")',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "667" or "$36,770"' }),
                    i18nString('label', 'Label', 'content'),
                ],
                preview: {
                    select: {
                        title: 'value',
                        subtitle: 'label.en'
                    }
                }
            }]
        }),
        i18nString('action', 'Action Button Text', 'content'),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            group: 'config',
            description: 'Used to sort programs in the list (ascending)',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            subtitle: 'summary.en',
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})
