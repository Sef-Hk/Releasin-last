// 'use client'
// import { useHeaderTheme } from '@/providers/HeaderTheme'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// import type { Header } from '@/payload-types'

// import { Logo } from '@/components/Logo/Logo'
// import { HeaderNav } from './Nav'

// interface HeaderClientProps {
//   data: Header
// }

// export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
//   /* Storing the value in a useState to avoid hydration errors */
//   const [theme, setTheme] = useState<string | null>(null)
//   const { headerTheme, setHeaderTheme } = useHeaderTheme()
//   const pathname = usePathname()

//   useEffect(() => {
//     setHeaderTheme(null)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname])

//   useEffect(() => {
//     if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [headerTheme])

//   return (
//     // <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
//     //  <div className="py-8 flex justify-center">

        
//     //     <HeaderNav data={data} />
//     //   </div>
//     // </header>
// <header
//   className="container relative z-20 text-black dark:text-black" // force black in both light and dark mode
//   {...(theme ? { 'data-theme': theme } : {})}
// >
//   <div className="py-8 flex justify-center">
//     <HeaderNav data={data} />
//   </div>
// </header>
//   )
// }


// Algined the navitems left :

'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: HeaderType
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="relative z-20 text-black dark:text-black bg-white" // keep the forced black text
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {/* Match the page container so the center column lines up with main */}
      <div className="mx-auto w-full max-w-[1400px] px-6">
        {/* Grid reproduces the layout.tsx columns: left whitespace / center / right whitespace */}
        <div className="grid grid-cols-1 items-center py-8 md:grid-cols-[1fr_4fr_1fr]">
          {/* Left column (hidden on small screens) — matches your left aside */}
          <div className="hidden md:block" aria-hidden />

          {/* Middle column — logo + nav aligned to the left of the center column */}
          <div className="flex items-center justify-start space-x-8">
            {/* Logo sits at the left edge of center column */}
        

            {/* Navigation — left aligned inside the center column */}
            <HeaderNav data={data} />
          </div>

          {/* Right column — reserved for actions, kept empty to match page right whitespace */}
          <div className="flex items-center justify-end">
            {/* Example: contact button / CTA / icon can go here */}
          </div>
        </div>
      </div>
    </header>
  )
}
