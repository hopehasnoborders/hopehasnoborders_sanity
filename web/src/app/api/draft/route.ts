import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const slug = searchParams.get('slug')

    // This secret should be stored as an environment variable and 
    // also set in the Sanity Studio Presentation settings.
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
        return new Response('Invalid secret', { status: 401 })
    }

    const draft = await draftMode()
    draft.enable()

    // If slug is provided, redirect to it, otherwise go home
    if (slug) {
        redirect(`/${slug === 'index' ? '' : slug}`)
    } else {
        redirect('/')
    }
}
