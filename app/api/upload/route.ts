import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const userId = data.get("user_id") as string | null

    // Use a default public image
    const imageUrl =
      "https://res.cloudinary.com/dldz7llz0/image/upload/v1773292534/samples/sheep.jpg"

    return NextResponse.json({
      success: true,
      message: "Using public image",
      user_id: userId,
      image: imageUrl,
    })
  } catch (error) {
    console.error("Upload error:", error)

    return NextResponse.json({
      success: false,
      message: "Upload failed",
    })
  }
}