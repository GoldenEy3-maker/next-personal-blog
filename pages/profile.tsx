import type { GetServerSideProps, NextPage } from 'next'
import { CookieType, RoutePaths } from '../typescript/enums'

import MainLayout from '../components/MainLayout'

import jwt from 'jsonwebtoken'

const ProfilePage: NextPage = () => {
  return (
    <MainLayout>
      <h1>ProfilePage</h1>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const authTokenCookie = req.cookies[CookieType.Authorization]

  if (authTokenCookie === undefined) {
    return {
      redirect: {
        destination: RoutePaths.AuthPage,
        permanent: false,
      },
    }
  }

  const jwtSecretKey = process.env.JWT_SECRET_KEY

  if (!jwtSecretKey) {
    return {
      redirect: {
        destination: RoutePaths.AuthPage,
        permanent: false,
      },
    }
  }

  const { token } = JSON.parse(authTokenCookie)

  const isValidToken = jwt.verify(token, jwtSecretKey)

  if (!isValidToken) {
    return {
      redirect: {
        destination: RoutePaths.AuthPage,
        permanent: false,
      },
    }
  }
  return { props: {} }
}

export default ProfilePage
