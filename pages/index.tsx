import type {GetServerSideProps, NextPage} from 'next'
import type {PostsList} from "../typescript/interfaces";
import {CookieType, RoutePaths} from '../typescript/enums'

import MainLayout from '../components/MainLayout'
import Stories from '../components/Stories'
import AddPost from '../components/AddPost'
import Posts from "../components/Posts";

import jwt from 'jsonwebtoken'

import Post1 from '../public/images/post1.jpg'
import Post2 from '../public/images/post2.jpg'
import Post3 from '../public/images/post3.jpg'


const postsList: PostsList[] = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.',
    date: '21.06.2020',
  }, {
    id: 2,
    image: Post1,
    title: 'Как писать код быстро и безболезненно?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.',
    date: '21.06.2020',
    tag: 'создание сайтов'
  },
  {
    id: 3,
    image: Post2,
    title: 'Купил новый ноутбук за 150 000 руб',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.',
    date: '21.06.2020',
    tag: 'продвижение видео'
  },
  {
    id: 4,
    image: Post3,
    title: 'Как я сходил на FrontEnd Conf 2021',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.',
    date: '21.06.2020',
    tag: 'создание сайтов'
  }
]

const HomePage: NextPage = () => {
  return (
    <MainLayout>
      <div className='home'>
        <div className='home__inner'>
          <Stories/>
          <AddPost/>
          <Posts postsList={postsList}/>
        </div>
      </div>
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

export default HomePage
