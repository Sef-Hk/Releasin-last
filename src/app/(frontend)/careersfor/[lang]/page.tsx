


import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { LetsTalk } from '@/components/letstalkGlob'
type Props = {
  params: { lang: string }
  searchParams?: { id?: string }
}

export default async function CareerPage({ params, searchParams }: Props) {
  const lang = params.lang
  const id = searchParams?.id ?? null

  // make sure to await the config if it's a Promise
  const payload = await getPayload({ config: await configPromise })

  let result: any = null
  if (id) {
    try {
      const findRes = await payload.find({
        collection: 'openpositions',
        limit: 1,
        pagination: false,
        where: {
          id: {
            equals: id,
          },
        },
      })
      result = findRes?.docs?.[0] ?? null
    } catch (err) {
      console.error('Payload fetch error:', err)
    }
  }

  // fallback values (adjust field names to match your collection schema)
  const header = result?.header || result?.title || 'Open Position'
  const location = result?.location || result?.fields?.location || '-'
  const typeVal = result?.type || result?.fields?.type || '-'
  const department = result?.department || result?.fields?.department || '-'
  const reportsTo = result?.reportsto || result?.fields?.reportsto || '-'
  const applyURL = result?.applyURL || result?.applyLink || '#'
  const richContent = result?.jobDescription ?? result?.description ?? []

  return (
    <div className="p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1
          className="text-4xl font-medium leading-tight mb-2 text-left"
          style={{ fontFamily: 'Geist, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
        >
          {header}
        </h1>

        {/* thin grey line under header */}
        <div className="h-[1px] bg-gray-200 w-full mb-6" />
      </div>

  {/* Details - one under the other */}
<div className="flex flex-col gap-4 mb-6">
  <div className="flex justify-between border-b border-gray-200 pb-2">
    <span className="text-sm font-medium text-black">Location</span>
    <span className="text-sm text-gray-500 text-right">{location}</span>
  </div>

  <div className="flex justify-between border-b border-gray-200 pb-2">
    <span className="text-sm font-medium text-black">Type</span>
    <span className="text-sm text-gray-500 text-right">{typeVal}</span>
  </div>

  <div className="flex justify-between border-b border-gray-200 pb-2">
    <span className="text-sm font-medium text-black">Department</span>
    <span className="text-sm text-gray-500 text-right">{department}</span>
  </div>

  <div className="flex justify-between border-b border-gray-200 pb-2">
    <span className="text-sm font-medium text-black">Report to</span>
    <span className="text-sm text-gray-500 text-right">{reportsTo}</span>
  </div>
</div>


      {/* LetsTalk component (passes a simple link object) */}
      <div className="mb-8">
      <LetsTalk 
        label="Apply Now" 
        url="http://localhost:3000/JoinOurTeam" 
      />
</div>

      {/* Rich text content */}
      <div className="prose max-w-none">
        <RichText data={richContent} enableGutter={false} />
      </div>

    {/* LetsTalk component (passes a simple link object) */}
    <div className="mt-8">
      <LetsTalk 
        label="Apply Now" 
        url="http://localhost:3000/JoinOurTeam" 
      />
</div>
      {/* Fallback if no result */}
      {!result && (
        <div className="mt-6 text-sm text-gray-500">
          No position selected or position not found.
        </div>
      )}
    </div>
  )
}
