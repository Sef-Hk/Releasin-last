// 'use client'

// import React from 'react'

// import type { Header as HeaderType } from '@/payload-types'

// import { CMSLink } from '@/components/Link'
// import Link from 'next/link'
// import { SearchIcon } from 'lucide-react'

// export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
//   const navItems = data?.navItems || []

//   return (
//     // <nav className="flex gap-3 items-center">
//     //   {navItems.map(({ link }, i) => {
//     //     return <CMSLink key={i} {...link} appearance="link" />
//     //   })}
     
//     // </nav>
//     <nav className="flex gap-3 items-center text-black dark:text-black">
//   {navItems.map(({ link }, i) => (
//     <CMSLink
//       key={i}
//       {...link}
//       appearance="link"
//       className="text-black !text-black" // force black, ignore dark mode
//     />
//   ))}
// </nav>
//   )
// }



'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { usePathname } from 'next/navigation'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center space-x-8 text-black">
      {navItems.map((item, i) => {
        const isActive = pathname === item?.link?.url // ⬅️ same logic as before

        return (
          <CMSLink
            key={i}
            {...item.link}
            className={`
              text-sm font-medium transition-colors duration-200
              ${isActive ? 'text-black underline' : 'text-black/80 hover:text-black'}
            `}
          />
        )
      })}
    </nav>
  )
}
