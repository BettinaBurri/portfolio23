'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Form from '@/components/Form'

function CreatePost() {
  const { data: session } = useSession()
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    post: '',
    tag: '',
  })

  const createPost = async (e: any) => {
    e.preventDefault() // prevent page refresh
    setSubmitting(true)
    try {
      const postData = { ...post, ...(session?.user?.id && { userId: session?.user?.id }) }
      const response = await axios.post('/api/post/new', postData)
      console.log('response', response)
      if (response.status === 201) {
        router.push('/')
      }
      // const res = await fetch('/api/posts', { )
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='CREATE'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  )
}

export default CreatePost
