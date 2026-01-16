import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Map Sanity document types to the paths that should be revalidated
const REVALIDATION_MAP: Record<string, string[]> = {
    pageHome: ['/'],
    pageAbout: ['/about'],
    pagePrograms: ['/programs'],
    pageStories: ['/stories'],
    pageResources: ['/resources'],
    pageVolunteer: ['/volunteer'],
    pageDonate: ['/donate'],
    program: ['/', '/programs'],
    testimonial: ['/', '/stories'],
    siteSettings: ['/', '/about', '/programs', '/stories', '/resources', '/volunteer', '/donate'],
}

interface SanityWebhookPayload {
    _type?: string
    _id?: string
}

export async function POST(request: NextRequest) {
    try {
        // Validate the webhook secret
        const secret = request.headers.get('x-sanity-webhook-secret')

        if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
            console.log('[Revalidate] Invalid or missing secret')
            return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
        }

        // Parse the webhook payload
        const body: SanityWebhookPayload = await request.json()
        const documentType = body._type

        if (!documentType) {
            console.log('[Revalidate] No document type in payload')
            return NextResponse.json({ message: 'No document type provided' }, { status: 400 })
        }

        // Get paths to revalidate for this document type
        const pathsToRevalidate = REVALIDATION_MAP[documentType]

        if (!pathsToRevalidate || pathsToRevalidate.length === 0) {
            console.log(`[Revalidate] No paths mapped for type: ${documentType}`)
            return NextResponse.json({
                message: 'Document type not configured for revalidation',
                type: documentType
            }, { status: 200 })
        }

        // Revalidate each path
        console.log(`[Revalidate] Revalidating paths for ${documentType}:`, pathsToRevalidate)

        for (const path of pathsToRevalidate) {
            revalidatePath(path)
        }

        return NextResponse.json({
            revalidated: true,
            paths: pathsToRevalidate,
            documentType,
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error('[Revalidate] Error:', error)
        return NextResponse.json(
            { message: 'Error processing webhook', error: String(error) },
            { status: 500 }
        )
    }
}

// Also support GET for testing (will return instructions)
export async function GET() {
    return NextResponse.json({
        message: 'Sanity revalidation webhook endpoint',
        method: 'POST',
        requiredHeaders: {
            'x-sanity-webhook-secret': 'Your SANITY_REVALIDATE_SECRET value'
        },
        supportedTypes: Object.keys(REVALIDATION_MAP)
    })
}
