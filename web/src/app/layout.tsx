import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { getClient } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { ClientLayout } from '@/components/layout/ClientLayout'
import { draftMode } from 'next/headers'
import PreviewOverlay from '@/components/PreviewOverlay'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hope Has No Borders',
  description: 'A grassroots response to the humanitarian crisis in Denver.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const draft = await draftMode()
  const settings = await getClient(draft.isEnabled).fetch(siteSettingsQuery)

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans selection:bg-yellow-200 selection:text-black`}
      >
        <ClientLayout announcement={settings?.announcement}>
          {children}
        </ClientLayout>
        <PreviewOverlay />
      </body>
    </html>
  )
}
