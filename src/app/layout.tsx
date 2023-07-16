import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import '@/styles/globals.css'
import { FC } from 'react'
export const metadata = {
  title: 'BURBE',
  description: 'BURBE',
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            <div>{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
