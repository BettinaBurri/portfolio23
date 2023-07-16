import User from '@/models/user'
import { connectToDatabase } from '@/utils/database'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

console.log('---------------------')
console.log('handler called')
console.log({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

const handler = new NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log('session is called', session)

      // await connectToDatabase()
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()
      return session
    },
    async signIn({ profile }) {
      try {
        // serverless -> lambda -> dynamodb
        const username = profile.name.replace(' ', '').toLowerCase()
        console.log('signIn called', username, profile)
        await connectToDatabase()
        // check if user exists in db
        const userExists = await User.findOne({ email: profile.email })
        // if not, create user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          })
        }
        return true
      } catch (error) {
        console.log(error)
      }
      return true
    },
  },
})

export { handler as GET, handler as POST }
