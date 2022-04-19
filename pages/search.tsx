import type {GetServerSideProps} from "next";
import type {PostsList} from '../typescript/interfaces'
import {CookieType, RoutePaths} from "../typescript/enums";

import {useEffect, useState} from 'react'

import MainLayout from '../components/MainLayout'

import Posts from '../components/Posts'

import {useSearchContext} from '../context/search.context'

import jwt from "jsonwebtoken";

import {postsList} from '../serverData/postsList'

const SearchPage = () => {
  const {searchValue} = useSearchContext()
  const [postsData, setPostsData] = useState<PostsList[]>(postsList)

  useEffect(() => {
    setPostsData((posts) =>
      posts.map((post) => ({...post, image: undefined}))
    )
  }, [])

  return (
    <MainLayout>
      <Posts
        postsList={postsData}
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
