// 'use client'

// import React from 'react'
// import type { HeaderbehindInter as HeaderBlockType } from '@/payload-types'

// export const HeaderBehind: React.FC<HeaderBlockType> = ({ header, desc }) => {
//   return (
//     <div className="flex flex-col items-start space-y-4">
//       {/* Header */}
//       <div
//         className="w-full border-b border-gray-300 pb-2"
//         style={{
//           fontFamily: 'Geist, sans-serif',
//           fontWeight: 400, // lighter weight
//           fontStyle: 'medium',
//           fontSize: '56px',
//           lineHeight: '28.6px',
//           letterSpacing: '-1.04px',
//           verticalAlign: 'middle',
//         }}
//       >
//         {header}
//       </div>

//       {/* Description */}
//       <div
//         className="text-left"
//         style={{
//           fontFamily: 'Geist, sans-serif',
//           fontWeight: 400,
//           fontStyle: 'regular',
//           fontSize: '18px',
//           lineHeight: '25.2px',
//           letterSpacing: '-0.54px',
//           verticalAlign: 'middle',
//           color: '#000000',
//           whiteSpace: 'pre-line',
//         }}
//       >
//         {desc}
//       </div>
//     </div>
//   )
// }

// export default HeaderBehind


'use client'

import React from 'react'
import type { HeaderbehindInter as HeaderBlockType } from '@/payload-types'

export const HeaderBehind: React.FC<HeaderBlockType> = ({ header, desc }) => {
  return (
    <div className="flex flex-col items-start space-y-4 px-4 sm:px-6 md:px-8 lg:px-0">
      {/* Header */}
      <h1
        className="w-full border-b border-gray-300 pb-2
                   text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                   font-medium"
        style={{
          fontFamily: 'Geist, sans-serif',
          letterSpacing: '-1.04px',
        }}
      >
        {header}
      </h1>

      {/* Description */}
      <p
        className="text-left text-base sm:text-lg md:text-xl lg:text-2xl"
        style={{
          fontFamily: 'Geist, sans-serif',
          letterSpacing: '-0.54px',
          color: '#000000',
          whiteSpace: 'pre-line',
        }}
      >
        {desc}
      </p>
    </div>
  )
}

export default HeaderBehind
