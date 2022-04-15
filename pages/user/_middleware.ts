import { CookieType } from '../../typescript/enums'
import { NextMiddleware, NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'

const middleware: NextMiddleware = async (req, res) => {
  const authTokenCookie = req.cookies[CookieType.Authorization]

  if (authTokenCookie === undefined) {
    throw new Error('Отсутсвует токент авторизации пользователя!')
    // return NextResponse.redirect('/')
  }

  const jwtSecretKey = process.env.JWT_SECRET_KEY

  if (!jwtSecretKey) {
    throw new Error('Jwt secret key is not defined!')
    // return NextResponse.redirect('/')
  }

  const { token } = JSON.parse(authTokenCookie)

  const isValidToken = jwt.verify(token, jwtSecretKey)

  if (!isValidToken) {
    throw new Error('Токен авторизации пользователя не прошел проверку!')
    // return NextResponse.redirect('/')
  }

  return NextResponse.next()
}

export default middleware
