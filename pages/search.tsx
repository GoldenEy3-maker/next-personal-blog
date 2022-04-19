import type {GetServerSideProps, NextPage} from "next";
import {CookieType, RoutePaths} from "../typescript/enums";

import MainLayout from '../components/MainLayout'

import Posts from '../components/Posts'

import {useSearchContext} from '../context/search.context'

import jwt from "jsonwebtoken";

import {postsList} from '../serverData/postsList'

const SearchPage: NextPage = () => {
  const {searchValue} = useSearchContext()

  return (
    <MainLayout>
      <Posts
        postsList={postsList}
        filterBy={searchValue.trim().toUpperCase()}
      />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
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

  const {token} = JSON.parse(authTokenCookie)

  const isValidToken = jwt.verify(token, jwtSecretKey)

  if (!isValidToken) {
    return {
      redirect: {
        destination: RoutePaths.AuthPage,
        permanent: false,
      },
    }
  }
  return {props: {}}
}


export default SearchPage
