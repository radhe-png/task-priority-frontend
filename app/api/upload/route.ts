import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const userId: string | null = data.get('user_id') as string

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save to public/user-{user_id}.jpg or user-img.jpg if no user_id
    const fileName = userId ? `user-${userId}.jpg` : 'user-img.jpg'
    const filePath = path.join(process.cwd(), 'public', fileName)
    await writeFile(filePath, buffer)

    return NextResponse.json({ success: true, message: 'File uploaded successfully', path: `/${fileName}` })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, message: 'Upload failed' })
  }
}
