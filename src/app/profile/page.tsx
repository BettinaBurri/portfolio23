'use client'
// import { useState, useEffect } from 'react'cf
import Profile from '@/components/Profile'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/api/users/${session?.user?.id}/posts`)
      setPosts(response.data.posts)
    }
    console.log('session', session?.user.id)
    if (session?.user?.id) {
      fetchPosts()
    }
  }, [])

  const handleEdit = (post: any) => {
    router.push(`/update-post?id=${post._id}`)
  }
  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?')
    if (hasConfirmed) {
      try {
        const response = await axios.delete(`/api/post/${post._id}`)
        const filteredPosts = posts.filter((p: any) => p._id !== post._id)
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name='My'
      desc='welcome to your personalized prifile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage
