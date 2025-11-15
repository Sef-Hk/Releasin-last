// // // export default FAQSection

// // 'use client'

// // import type { FAQBlock as FAQBlockType } from '@/payload-types'


// // export const FAQSection: React.FC<FAQBlockType> = ({ header, items }) => {
  


// //   return (
// //    <div>
// //     <div>{header}</div>
// //     <div>{items.map((item,ind) =>{
// //         return(
// //             <div key={ind}>
// //                 <div>{item.question}</div>
// //                 <div>{item.responseNode}</div>
// //             </div>
// //         )
// //     })}</div>
// //    </div>
// //   )
// // }

// // export default FAQSection


// 'use client'

// import React, { useState } from 'react'
// import type { FAQBlock as FAQBlockType } from '@/payload-types'

// export const FAQSection: React.FC<FAQBlockType> = ({ header, items }) => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null)

//   const toggleIndex = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index)
//   }

//   return (
//     <div className="w-full max-w-3xl mx-auto">
//       {/* Header */}
//       <div className="text-left text-2xl font-semibold mb-2">{header}</div>
//       <div className="h-[1px] bg-gray-300 mb-4"></div>

//       {/* FAQ Items */}
//       <div className="flex flex-col gap-2">
//         {items.map((item, index) => {
//           const isOpen = openIndex === index
//           return (
//             <div
//               key={index}
//               className="cursor-pointer"
//               onClick={() => toggleIndex(index)}
//             >
//               {/* Top Grey Line */}
//               <div className="h-[1px] bg-gray-300"></div>

//               {/* Question */}
//               <div className="flex justify-between items-center py-3 px-2">
//                 <div className="text-left">{item.question}</div>
//                 <div className="text-gray-500 font-bold text-xl">
//                   {isOpen ? '-' : '+'}
//                 </div>
//               </div>

//               {/* Response */}
//               <div
//                 className={`overflow-hidden transition-all duration-300 text-gray-600 px-2`}
//                 style={{ maxHeight: isOpen ? '500px' : '0' }}
//               >
//                 <div className="py-2">{item.responseNode}</div>
//               </div>

//               {/* Bottom Grey Line */}
//               <div className="h-[1px] bg-gray-300"></div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default FAQSection


'use client'

import React, { useState } from 'react'
import type { FAQBlock as FAQBlockType } from '@/payload-types'

export const FAQSection: React.FC<FAQBlockType> = ({ header, items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div
        style={{
          fontFamily: 'Geist',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '28px',
        }}
        className="mb-2"
      >
        {header}
      </div>
      <div className="border-t border-gray-300 mb-6" />

      {/* FAQ Items */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index} className="w-full">
              {/* Top Grey Line */}
              <div className="border-t border-gray-300" />

              {/* Question */}
              <div
                onClick={() => toggleIndex(index)}
                className="flex justify-between items-center py-3 cursor-pointer"
              >
                <div
                  style={{
                    fontFamily: 'Geist',
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '22px',
                  }}
                >
                  {item.question}
                </div>
                <div className="text-gray-500 font-bold text-xl">
                  {isOpen ? '-' : '+'}
                </div>
              </div>

              {/* Response */}
              <div
                className={`overflow-hidden transition-all duration-300 text-gray-600`}
                style={{ maxHeight: isOpen ? '500px' : '0' }}
              >
                <div
                  style={{
                    fontFamily: 'Geist',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '20px',
                  }}
                  className="py-2"
                >
                  {item.responseNode}
                </div>
              </div>

              {/* Bottom Grey Line */}
              <div className="border-t border-gray-300" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FAQSection
