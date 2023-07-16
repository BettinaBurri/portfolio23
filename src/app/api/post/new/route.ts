import Post from '@/models/post'
import { connectToDatabase } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { userId, post, tag } = await req.json()

  try {
    await connectToDatabase()
    const newPost = await Post.create({ creator: userId, post, tag })
    newPost.save()
    return NextResponse.json({ newPost, success: true }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
