'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Form from '@/components/Form'
import axios from 'axios'

function EditPost() {
  const { data: session } = useSession()
  const router = useRouter()

  const searchParams = useSearchParams()
  const postId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    post: '',
    tag: '',
  })

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/api/post/${postId}`)
      const data = await response.data.post
      console.log('data', data)
      setPost({
        post: data.post,
        tag: data.tag,
      })
    }
    if (postId) {
      fetchPost()
    }
  }, [postId])

  const updatePost = async (e: any) => {
    e.preventDefault() // prevent page refresh
    setSubmitting(true)
    if (!postId) return alert('Post not found')
    try {
      const response = await axios.patch(`/api/post/${postId}`, {
        post: post.post,
        tag: post.tag,
      })

      if (response.status === 200) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='UPDATE'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  )
}

export default EditPost
