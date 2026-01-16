import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'

export default async function PreviewOverlay() {
    const draft = await draftMode()
    if (!draft.isEnabled) return null

    return (
        <>
            <VisualEditing />
            <div className="fixed bottom-4 right-4 z-[9999]">
                <a
                    href="/api/disable-draft"
                    className="bg-neutral-900 text-[#FFB81C] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-[#FFB81C] shadow-2xl hover:bg-black transition-colors"
                >
                    Exit Preview
                </a>
            </div>
        </>
    )
}
