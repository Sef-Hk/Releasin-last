


import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// This RootLayout implements a 3-column layout:
// - Left and Right are equal whitespace (hidden on small screens)
// - Center is larger and contains the page content and the Footer
// - Thin vertical lines separate the columns (only shown on md+)
// - Thin horizontal line separates the header from the 3-column area

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
          {/* Preconnect for Google Fonts */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  
  {/* Import Geist, Inter, Open Sans */}
  <link
    href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet"
  />
      </head>
      <body className="bg-white text-slate-900">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {/* Header stays above the three-column split */}
          <Header />

          {/* Horizontal thin line separating header and the 3-column area */}
          <div className="border-t border-gray-200" />

          {/* 3-column area */}
          <div className="min-h-[60vh]">
            <div className="mx-auto w-full max-w-[1400px]">
              {/* Use flex so it's easy and reliable with Tailwind. On small screens the side columns are hidden. */}
              <div className="flex">
                {/* Left whitespace (hidden on small screens) */}
                <aside className="hidden md:block w-1/6" aria-hidden>
                  {/* intentionally empty - white space */}
                </aside>

                {/* Center column: slightly larger, contains children + Footer. Add thin vertical borders on md. */}
                <main className="w-full md:w-4/6 px-6 py-8 md:border-l md:border-r md:border-gray-200">
                  <div className="prose max-w-none">{children}</div>

                  {/* Footer must display in the middle part */}
                  <div className="mt-12">
                    <Footer />
                  </div>
                </main>

                {/* Right whitespace (hidden on small screens) */}
                <aside className="hidden md:block w-1/6" aria-hidden>
                  {/* intentionally empty - white space */}
                </aside>
              </div>
            </div>
          </div>

          {/* Providers/portals (kept outside the three-column area if needed) */}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
