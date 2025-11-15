import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const fullName = String(body?.fullName || '').trim()
    const email = String(body?.email || '').trim()
    const phone = String(body?.phone || '').trim()
    const company = String(body?.company || '').trim()
    const projectDetail = String(body?.projectDetail || '').trim()

    // Basic validation
    if (!fullName || !email || !phone || !company || !projectDetail) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const quotation = await payload.create({
      collection: 'request-quotations',
      data: {
        fullName,
        email,
        phone,
        company,
        projectDetail,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json(quotation, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ message: err?.message || 'Server error' }, { status: 500 })
  }
}
