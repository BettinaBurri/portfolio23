import mongoose from 'mongoose'
let isConnected = false
export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('=> MongoDB is already connected')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    // await mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // })
    isConnected = true
    console.log('=> MongoDB connection success')
  } catch (error) {
    console.log('=> MongoDB connection error: ', error)
    throw error
  }
}
