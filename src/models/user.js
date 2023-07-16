import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username already exists'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: {
    type: String,
  },
})

console.log('models.users', models?.Users, models?.User, models)
const User = models.Users || model('Users', userSchema)
module.exports = User
export default User
