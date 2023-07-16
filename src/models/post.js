import { Schema, model, models } from 'mongoose'

const postSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  post: {
    type: String,
    required: [true, 'Post is required'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  },
})

const Post = models.Post || model('Post', postSchema)

export default Post
