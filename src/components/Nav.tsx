'use client'

import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { SetStateAction, useEffect, useState } from 'react'
// import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

// import Image from "next/image"
// import Link from "next/link"
// const signOut = () => {
//   console.log('signout')
// }

function Nav() {
  // const isUserLoggedIn = true
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response as SetStateAction<null>)
    }

    setUpProviders()
  }, [])

  return (
    <div className='w-full flex flex-between mb-16 pt-3'>
      <Link href='/' className='flex flex-center gap-4'>
        <Image
          src='/assets/images/logo.svg'
          alt='Promptopia'
          width={30}
          height={30}
          className='rounded-full object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      <>{console.log('providers', providers)}</>
      <>{console.log('session?.user', session?.user)}</>
      <>{console.log('session?.user', session?.user)}</>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-post' className='black_btn'>
              Create Post
            </Link>
            <button onClick={() => signOut()} type='button' className='outline_btn'>
              Signout
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user?.image!}
                alt='Profile'
                width={37}
                height={37}
                className='rounded-full object-contain'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any, index) => (
                <button
                  key={provider?.name || index}
                  onClick={() => signIn('google')}
                  type='button'
                  className='outline_btn'>
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      {/* MOBILE Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user?.image!}
              alt='Profile'
              width={37}
              height={37}
              className='rounded-full object-contain'
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className={`dropdown`}>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                  href='/create-post'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>
                  Create pr
                </Link>
                <button
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut
                  }}
                  type='button'
                  className='mt-5 w-full black_btn'>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any, index) => (
                <button
                  key={provider?.name || index}
                  onClick={() => signIn()}
                  type='button'
                  className='outline_btn'>
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Nav
