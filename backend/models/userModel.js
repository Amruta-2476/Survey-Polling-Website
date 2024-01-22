const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures that the username is unique
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  poll: [{ type: Schema.Types.ObjectId, ref: 'Poll' }],
  surveysTaken: [{ type: Schema.Types.ObjectId, ref: 'Survey' }],
  _id: mongoose.Schema.Types.ObjectId,
  // survPollsTaken:{
  //   type:Number,
  //   default:0
  // },
  // attemped:[mongoose.Schema.Types.ObjectId]
})

// static signup method
userSchema.statics.signup = async function (username, email, password) {
  
  // validation
  if (!username || !email || !password) {
    throw Error('All fields must be filled !')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

    // Check if the username already exists
    const usernameExists = await this.findOne({ username });
    if (usernameExists) {
      throw Error('Username already in use');
  }
  
  // email already exists
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

    // Generate a new ObjectId for the user
    const userId = new mongoose.Types.ObjectId();

  const user = await this.create({
    _id: userId,
    username,
    email,
    password: hash
  })
  return user;
}

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  
  return user
}

module.exports = mongoose.model('User', userSchema)