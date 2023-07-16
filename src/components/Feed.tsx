'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import PostCard from './PostCard'

const PostCardList = ({ data, handleTagClick }: any) => {
  if (!data.length) return <h2>Loading...</h2>
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post: any) => (
        <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

function Feed({}) {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearchChange = (e: any) => {
    e.preventDefault()
    setSearchText(e.target.value)
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('/api/post')
      console.log('axios response', response.data.posts)
      setPosts(response.data.posts)
      setIsLoading(false)
    }
    setIsLoading(true)
    fetchPosts()
    setIsLoading(false)
  }, [])

  if (isLoading) return <h1>Loading...</h1>

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          className='search_input peer'
          type='text'
          name='text'
          placeholder='Enter Search...'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PostCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

Feed.propTypes = {}
export default Feed
