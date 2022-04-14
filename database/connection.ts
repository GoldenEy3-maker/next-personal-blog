import { GlobalVariablesErrorMessages } from '../typescript/enums'

import { connect } from 'mongoose'

import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error(GlobalVariablesErrorMessages.DatabaseURI)
}

const dbConnect = async () => {
  try {
    await connect(MONGO_URI, {
      bufferCommands: false,
    })
  } catch (err) {
    throw new Error(GlobalVariablesErrorMessages.DatabaseURI)
  }
}

export default dbConnect
