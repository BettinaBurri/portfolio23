import Post from '@/models/post'
import { connectToDatabase } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase()
    const posts = await Post.find({}).populate('creator')
    return NextResponse.json({ posts: posts, success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
