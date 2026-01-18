import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Map Sanity document types to the paths that should be revalidated
const REVALIDATION_MAP: Record<string, string[]> = {
    pageHome: ['/'],
    pageAbout: ['/about'],
    pagePrograms: ['/programs'],
    pageStories: ['/stories'],
    pageResources: ['/resources'],
    pageVolunteer: ['/volunteer'],
    program: ['/', '/programs'],
    testimonial: ['/', '/stories'],
    siteSettings: ['/', '/about', '/programs', '/stories', '/resources', '/volunteer'],
}

// Map Sanity document types to cache tags for on-demand revalidation
const TAG_MAP: Record<string, string[]> = {
    pageHome: ['home'],
    pageAbout: ['about'],
    pagePrograms: ['programs-page'],
    pageStories: ['stories'],
    pageResources: ['resources'],
    pageVolunteer: ['volunteer'],
    program: ['programs'],
    testimonial: ['testimonials'],
    siteSettings: ['settings'],
}

interface SanityWebhookPayload {
    _type?: string
    _id?: string
}

export async function POST(request: NextRequest) {
    try {
        // Validate the webhook secret
        const secret = request.headers.get('x-sanity-webhook-secret')

        console.log('[Revalidate] Received webhook request')
        console.log('[Revalidate] Secret present:', !!secret)
        console.log('[Revalidate] Env secret present:', !!process.env.SANITY_REVALIDATE_SECRET)

        if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
            console.log('[Revalidate] Invalid or missing secret')
            console.log('[Revalidate] Received:', secret?.substring(0, 5) + '...')
            return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
        }

        // Parse the webhook payload
        const body: SanityWebhookPayload = await request.json()
        const documentType = body._type

        console.log('[Revalidate] Document type:', documentType)
        console.log('[Revalidate] Document ID:', body._id)

        if (!documentType) {
            console.log('[Revalidate] No document type in payload')
            return NextResponse.json({ message: 'No document type provided' }, { status: 400 })
        }

        // Get paths and tags to revalidate for this document type
        const pathsToRevalidate = REVALIDATION_MAP[documentType] || []
        const tagsToRevalidate = TAG_MAP[documentType] || []

        if (pathsToRevalidate.length === 0 && tagsToRevalidate.length === 0) {
            console.log(`[Revalidate] No paths or tags mapped for type: ${documentType}`)
            return NextResponse.json({
                message: 'Document type not configured for revalidation',
                type: documentType
            }, { status: 200 })
        }

        // Revalidate each tag (primary method for on-demand revalidation)
        console.log(`[Revalidate] Revalidating tags for ${documentType}:`, tagsToRevalidate)
        for (const tag of tagsToRevalidate) {
            try {
                revalidateTag(tag)
                console.log(`[Revalidate] Successfully revalidated tag: ${tag}`)
            } catch (e) {
                console.error(`[Revalidate] Error revalidating tag ${tag}:`, e)
            }
        }

        // Revalidate each path (fallback)
        console.log(`[Revalidate] Revalidating paths for ${documentType}:`, pathsToRevalidate)
        for (const path of pathsToRevalidate) {
            try {
                revalidatePath(path)
                console.log(`[Revalidate] Successfully revalidated path: ${path}`)
            } catch (e) {
                console.error(`[Revalidate] Error revalidating path ${path}:`, e)
            }
        }

        return NextResponse.json({
            revalidated: true,
            tags: tagsToRevalidate,
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
        supportedTypes: Object.keys(REVALIDATION_MAP),
        envConfigured: !!process.env.SANITY_REVALIDATE_SECRET
    })
}
