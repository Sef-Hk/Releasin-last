// import type { OpenpositionInter } from "@/payload-types"
// export const OpenPosition : React.FC<OpenpositionInter> = ({postion,header}) => {
//     return (
//         <div>
             
//              <div>{header}</div>
//             {postion?.map((pos,ind)=> {
//                 return(
//                     <div key={ind}>
//                        <div> here are the postion modifed theem, leter</div> 
                       
                    
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { OpenpositionInter } from '@/payload-types'

type PopulatedPosition = {
  id?: string
  _id?: string
  title?: string
  header?: string
  location?: string
  city?: string
}

function isPopulated(pos: unknown): pos is PopulatedPosition {
  return typeof pos === 'object' && pos !== null && !Array.isArray(pos)
}

export const OpenPosition: React.FC<OpenpositionInter> = ({ postion, header }) => {
  const params = useParams() as { lang?: string } | null
  const lang = params?.lang ?? 'en'

  if (!postion || postion.length === 0) {
    return (
      <section className="py-6">
        <div className="text-left text-xl font-medium">{header}</div>
        <div className="mt-2 h-[1px] bg-gray-200 w-full" />
        <p className="mt-4 text-sm text-gray-500">No open positions.</p>
      </section>
    )
  }

  return (
    <section className="py-6">
      <h2 className="text-left text-2xl font-semibold leading-tight">{header}</h2>
      <div className="mt-2 h-[1px] bg-gray-200 w-full" />

      <div className="mt-4 space-y-2">
        {postion.map((pos, index) => {
          let posId: string
          let title: string
          let location: string

          if (isPopulated(pos)) {
            posId = pos.id ?? pos._id ?? `pos-${index}`
            title = pos.title ?? pos.header ?? `Open Position ${index + 1}`
            location = pos.location ?? pos.city ?? ''
          } else {
            posId = String(pos)
            title = `Open Position ${index + 1}`
            location = ''
          }

          const href = `/careersfor/${lang}?id=${encodeURIComponent(posId)}`

          return (
            <Link
              key={posId}
              href={href}
              className="block no-underline"   // 🔥 removes underline
            >
              <div className="flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-sm">
                <div className="text-left text-base font-medium">{title}</div>
                <div className="text-right text-sm text-gray-500">{location}</div>
              </div>

              <div className="h-[1px] bg-gray-200 w-full" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
