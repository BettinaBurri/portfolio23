'use client'

import Link from 'next/link'

interface FormProps {
  type: 'CREATE' | 'UPDATE'
  post?: any
  setPost?: any
  submitting?: boolean
  handleSubmit?: any
}
const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  const postType = type === 'CREATE' ? 'Create' : 'Update'
  console.log('post', post)
  return (
    <section className='w-full mas-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{postType} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {postType} and share your prompt with the world and let your imagination run wilder than a
        crypto guy.
      </p>
      <form
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        onSubmit={handleSubmit}>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700 '>Your Post</span>
          <textarea
            value={post.post}
            onChange={(e) => setPost({ ...post, post: e.target.value })}
            placeholder='Write your post now...'
            required
            className='form_textarea'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700 '>
            Tag <span className='font-normal'>(#product, #webdevelopment, #idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder='#tag'
            required
            className='form_input'
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link className='text-gray-500' href='/'>
            Cancel
          </Link>
          <button
            className='px-5 py-1.5 text-sm  bg-primary-orange rounded-full text-white'
            type='submit'
            disabled={submitting}>
            {submitting ? `${postType}...` : postType}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
