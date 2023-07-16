import Post from '@/models/post'
import { connectToDatabase } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, { params }: { params: any }) => {
  console.log('get post', params, params.id)
  try {
    await connectToDatabase()
    const post = await Post.findById(params.id).populate('creator')
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    return NextResponse.json({ post: post, success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export const PATCH = async (reqest: NextRequest, { params }: { params: any }) => {
  const { post, tag } = await reqest.json()
  try {
    await connectToDatabase()
    const existingPost = await Post.findById(params.id)
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    existingPost.post = post
    existingPost.tag = tag
    await existingPost.save()

    return NextResponse.json({ post: existingPost, success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export const DELETE = async (reqest: NextRequest, { params }: { params: any }) => {
  try {
    await connectToDatabase()
    const post = await Post.findByIdAndRemove(params.id).populate('creator')
    return NextResponse.json('Post deleted sucessfully', { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
