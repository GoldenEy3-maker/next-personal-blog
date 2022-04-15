import {
  CookieType,
  GlobalVariablesErrorMessages,
} from '../../typescript/enums'
import { NextMiddleware, NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'

const middleware: NextMiddleware = async (req, res) => {
  const authTokenCookie = req.cookies[CookieType.Authorization]

  if (authTokenCookie === undefined) {
    return NextResponse.redirect('/')
  }

  const jwtSecretKey = process.env.JWT

  if (!jwtSecretKey) {
    return NextResponse.redirect('/')
  }

  const { token } = JSON.parse(authTokenCookie)

  const isValidToken = jwt.verify(token, jwtSecretKey)

  if (!isValidToken) {
    return NextResponse.redirect('/')
  }

  return NextResponse.next()
}

export default middleware
