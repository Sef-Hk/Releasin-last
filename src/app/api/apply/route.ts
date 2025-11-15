import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'
import crypto from 'crypto'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const fullName = (formData.get('fullName') as string || '').trim()
    const email = (formData.get('email') as string || '').trim()
    const phone = (formData.get('phone') as string || '').trim()
    const position = (formData.get('position') as string || '').trim()
    const cvFile = formData.get('cv') as File | null
    const additionalLinks = (formData.get('additionalLinks') as string || '').trim()
    const coverLetter = (formData.get('coverLetter') as string || '').trim()

    // Validate required fields
    const errors: Record<string, string> = {}
    if (!fullName) errors.fullName = 'Full name is required'
    if (!email) errors.email = 'Email is required'
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'Invalid email'
    if (!phone) errors.phone = 'Phone is required'
    if (!position) errors.position = 'Position is required'
    if (!cvFile) errors.cv = 'CV file is required'
    if (!coverLetter) errors.coverLetter = 'Cover letter is required'

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // Write CV to temp file
    const buffer = Buffer.from(await cvFile!.arrayBuffer())
    const tmpPath = path.join(os.tmpdir(), `${crypto.randomUUID()}-${cvFile!.name}`)
    await fs.writeFile(tmpPath, buffer)

    let cvDoc: any
    try {
      cvDoc = await payload.create({
        collection: 'media',  // matches your Media collection
        filePath: tmpPath,
        data: { alt: `${fullName} CV` }, // use fullName as alt text
      })
    } catch (e: any) {
      const msg = e?.message || 'Server error'
      return NextResponse.json({ errors: { cv: msg } }, { status: 400 })
    } finally {
      fs.unlink(tmpPath).catch(() => {})
    }

    // Create the join request
    const joinRequest = await payload.create({
      collection: 'join-requests',
      data: {
        fullName,
        email,
        phone,
        position,
        cv: cvDoc.id,
        additionalLinks,
        coverLetter,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({ message: 'Application submitted successfully', joinRequest }, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ message: err?.message || 'Server error' }, { status: 500 })
  }
}
