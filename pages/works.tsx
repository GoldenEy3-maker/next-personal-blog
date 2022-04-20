import type {NextPage, GetServerSideProps} from "next";
import {CookieType, RoutePaths} from "../typescript/enums";

import Image from 'next/image'
import Link from 'next/link'

import MainLayout from "../components/MainLayout";

import jwt from "jsonwebtoken";

import styles from '../styles/modules/Works.module.scss'

import {worksList} from "../serverData/worksList";

const {
  works,
  works__inner,
  works__list,
  worksItem,
  worksItem__picture,
  worksItemContent,
  worksItemContent__title,
  worksItemContent__text,
  worksItemContentTags,
  worksItemContentTags__list,
  worksItemContentTags__item,
  worksItemContent__link
} = styles

const WorksPage: NextPage = () => {
  return (
    <MainLayout>
      <div className={works}>
        <div className={works__inner}>
          <ul className={works__list}>
            {worksList.length > 0 && worksList.map(({id, image, title, text, tags, href}) => (
              <li key={id} className={worksItem}>
                <div className={worksItem__picture}>
                  <Image src={image.src} alt='project picture' width={image.width} height={image.height}
                         layout='responsive'/>
                </div>
                <div className={worksItemContent}>
                  <div className={worksItemContent__title}>{title}</div>
                  <div className={worksItemContent__text}>{text}</div>
                  <div className={worksItemContentTags}>
                    <ul className={worksItemContentTags__list}>
                      {tags.length > 0 && tags.map((tag) => (
                        <li key={tag} className={worksItemContentTags__item}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={worksItemContent__link}>
                    <Link href={href}>
                      <a>Перейти на сайт</a>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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

export default WorksPage