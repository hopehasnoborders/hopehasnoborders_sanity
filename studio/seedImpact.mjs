import { getCliClient } from 'sanity/cli'

// Automatically uses the authenticated user's token from `sanity login`
const client = getCliClient({ apiVersion: '2023-01-01' })

const impactData = {
    keyMetrics: [
        { label: { en: 'Funding Raised', es: 'Fondos Recaudados' }, value: 269652, prefix: '$' },
        { label: { en: 'Direct Program Spend', es: 'Gasto Directo del Programa' }, value: 91, suffix: '%' },
        { label: { en: 'Projected Budget (2025)', es: 'Presupuesto Proyectado (2025)' }, value: 231391, prefix: '$' },
        { label: { en: 'Below Budget', es: 'Por Debajo del Presupuesto' }, value: 7000, prefix: '$' },
    ],
    outcomeMetrics: [
        { label: { en: 'Improved Mental Health & Stability', es: 'Mejora en Salud Mental y Estabilidad' }, value: '78%' },
        { label: { en: 'Improved Employment Confidence', es: 'Mejora en Confianza Laboral' }, value: '70%' },
        { label: { en: 'Would Recommend Programs', es: 'Recomendaría los Programas' }, value: '100%' },
    ],
    programs: [
        {
            title: 'Crisis to HOPE Fund',
            impactMetrics: [
                { value: '667', label: { en: 'People Supported', es: 'Personas Apoyadas' } },
                { value: '333', label: { en: 'Children Supported', es: 'Niños Apoyados' } },
            ]
        },
        {
            title: 'Pathways to HOPE',
            impactMetrics: [
                { value: '1,030', label: { en: 'Asylum Applications Filed', es: 'Solicitudes de Asilo Presentadas' } },
                { value: '431', label: { en: 'Work Authorizations & Court Letters', es: 'Permisos de Trabajo y Cartas Judiciales' } },
            ]
        },
        {
            title: 'HOPE Community Services',
            impactMetrics: [
                { value: '$36,770', label: { en: 'Direct Gifts to Volunteers', es: 'Regalos Directos a Voluntarios' } },
                { value: '1,970', label: { en: 'Volunteer Hours Served', es: 'Horas de Voluntariado Servidas' } },
            ]
        },
        {
            title: 'HOPE Host Home Program',
            impactMetrics: [
                { value: '55', label: { en: 'Individuals Housed', es: 'Individuos Alojados' } },
                { value: '100%', label: { en: 'Permanent Housing Transition', es: 'Transición a Vivienda Permanente' } },
            ]
        },
        // We can include qualitative highlights as testimonials if needed, but for now focusing on metrics
    ]
}

async function runSeed() {
    console.log('🌱 Seeding Impact Data...')

    // 1. Update Home Page Metrics
    try {
        // Fetch current home page
        const homePage = await client.fetch('*[_type == "pageHome"][0]')

        if (homePage) {
            // Prepare program references first
            // We need to find the program IDs to link them in the Home Page "Impact Programs" list
            const programRefs = []

            // 2. Update Programs and get IDs
            for (const prog of impactData.programs) {
                try {
                    // Find program by title (fuzzy match or exact)
                    const doc = await client.fetch(`*[_type == "program" && title.en match $title][0]`, { title: prog.title })

                    if (doc) {
                        await client.patch(doc._id).set({
                            impactMetrics: prog.impactMetrics
                        }).commit()
                        console.log(`✅ Updated Program: ${prog.title}`)
                        // Add to references
                        programRefs.push({ _type: 'reference', _ref: doc._id, _key: doc._id })
                    } else {
                        console.warn(`⚠️ Program not found: ${prog.title}`)
                    }
                } catch (error) {
                    console.error(`Error updating program ${prog.title}:`, error.message)
                }
            }

            // Patch Home Page
            await client.patch(homePage._id).set({
                'impactSection': {
                    title: { en: 'Our Impact in Action', es: 'Nuestro Impacto en Acción' },
                    subtitle: { en: '2025 marked the first full year of operations for Hope Has No Borders as a formal nonprofit.', es: '2025 marcó el primer año completo de operaciones para Hope Has No Borders como una organización sin fines de lucro formal.' },
                    keyMetrics: impactData.keyMetrics,
                    outcomeMetrics: impactData.outcomeMetrics,
                    closingCTA: {
                        text: { en: 'Support Our Work', es: 'Apoya Nuestro Trabajo' },
                        link: '/donate',
                        message: { en: "We couldn't do this without your support.", es: "No podríamos hacer esto sin tu apoyo." }
                    },
                    programs: programRefs, // Link the programs we found
                    // We leave testimonials as is or empty for now
                }
            }).commit()
            console.log('✅ Updated Home Page Metrics & Program Links')
        }
    } catch (error) {
        console.error('Error updating home page:', error.message)
    }

    console.log('✨ Seed Complete!')
}

runSeed()
