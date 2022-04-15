import type { Endpoint } from '../../../typescript/interfaces'
import type { ResponseData } from '../../../typescript/types'
import {
  CookieType,
  EndpointMessages,
  GlobalVariablesErrorMessages,
} from '../../../typescript/enums'

import dbConnect from '../../../database/connection'
import UserModel from '../../../database/models/User.model'

import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setCookies } from 'cookies-next'
import 'dotenv/config'

const handler: Endpoint<ResponseData> = async (req, res) => {
  try {
    await dbConnect()

    const { body } = req

    const { email, password } = body

    const isValidEmail = validator.isEmail(email)

    if (!isValidEmail) {
      throw new Error(EndpointMessages.InvalidValues)
    }

    const existUser = await UserModel.findOne({ email })

    if (!existUser) {
      throw new Error(EndpointMessages.UserIsNotExist)
    }

    const isPasswordCompare = await bcrypt.compare(password, existUser.password)

    if (!isPasswordCompare) {
      throw new Error(EndpointMessages.InvalidValues)
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

    if (!JWT_SECRET_KEY) {
      throw new Error(GlobalVariablesErrorMessages.JwtSecret)
    }

    const jwtToken = jwt.sign({ token: existUser._id }, JWT_SECRET_KEY)

    setCookies(
      CookieType.Authorization,
      { token: jwtToken, userId: existUser._id },
      { req, res, maxAge: 60 * 60 * 24 * 30 * 3, httpOnly: true, secure: true }
    )
    setCookies(CookieType.AlreadyLogged, 1, { req, res })

    return res.status(200).json({
      success: true,
      data: null,
      message: EndpointMessages.AuthorizationSuccess,
    })
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      data: null,
      message: err.message || EndpointMessages.AuthorizationFailed,
    })
  }
}

export default handler
