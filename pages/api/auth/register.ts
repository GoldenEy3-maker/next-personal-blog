import { isStrongPassword } from './../../../lib/functions'
import type { ResponseData } from './../../../typescript/types'
import type { Endpoint } from '../../../typescript/interfaces'
import { EndpointMessages } from '../../../typescript/enums'

import dbConnect from '../../../database/connection'
import UserModel from '../../../database/models/User.model'

import validator from 'validator'
import bcrypt from 'bcrypt'

const handler: Endpoint<ResponseData> = async (req, res) => {
  try {
    await dbConnect()

    const { body } = req

    const { name, email, password, confirmPassword } = body

    const isAlredyExistUser = await UserModel.findOne({ email })

    if (isAlredyExistUser) {
      throw new Error(EndpointMessages.AlreadyExistUser)
    }

    const isEmailValid = validator.isEmail(email)

    const isPasswordMinLenght = isStrongPassword(password, {
      minLenght: 6,
    })
    const isPasswrodMinNumbers = isStrongPassword(password, {
      minNumbers: 1,
    })
    const isPasswordUppercase = isStrongPassword(password, {
      minUppercase: 1,
    })

    const isPasswordValid =
      isPasswordMinLenght &&
      isPasswrodMinNumbers &&
      isPasswordUppercase &&
      password === confirmPassword

    const isValuesValid = isEmailValid && isPasswordValid

    if (!isValuesValid) {
      throw new Error(EndpointMessages.ValidationFailed)
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new UserModel({ name, email, password: hashedPassword })

    await newUser.save()

    return res.status(200).json({
      success: true,
      data: null,
      message: EndpointMessages.SuccessfulCreateUser,
    })
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      data: null,
      message: err.message || EndpointMessages.RegistrationFailed,
    })
  }
}

export default handler
