import Feed from '@/components/Feed'

const Home = () => {
  return (
    <section className='w-full place-items-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient'>AI-Powered Prompts</span>
      </h1>
      <p className='desc w-full text-center'>Create and share prompts</p>
      <Feed />
    </section>
  )
}

export default Home
