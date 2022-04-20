import type {GetServerSideProps, NextPage} from 'next'
import {CookieType, RoutePaths} from '../typescript/enums'

import {ChangeEventHandler, useState} from "react";

import MainLayout from '../components/MainLayout'
import FormInput from "../components/FormInput";

import jwt from 'jsonwebtoken'

import styles from '../styles/modules/Profile.module.scss'

const {
  profile,
  profile__inner,
  profile__title,
  profileForm,
  profileFormInputs,
  profileFormInputs__list,
  profileFormInputs__item,
  profileFormInputs__sendBtn,
  profileFormAvatar
} = styles

const ProfilePage: NextPage = () => {
  const [formProfileValues, setFormProfileValues] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    userConfirmPassword: ''
  })

  const changeInputProfileFormValueHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormProfileValues(values => ({...values, [event.target.name]: event.target.value})
    )
  }

  return (
    <MainLayout>
      <div className={profile}>
        <div className={profile__inner}>
          <div className={profile__title}>
            Настройки профиля
          </div>
          <form className={profileForm}>
            <div className={profileFormInputs}>
              <ul className={profileFormInputs__list}>
                <li className={profileFormInputs__item}>
                  <FormInput type='text' name='userName' placeholder='имя' value={formProfileValues.userName}
                             changeHandler={changeInputProfileFormValueHandler}/>
                </li>
                <li className={profileFormInputs__item}>
                  <FormInput type='email' name='userEmail' placeholder='email' value={formProfileValues.userEmail}
                             changeHandler={changeInputProfileFormValueHandler}/>
                </li>
                <li className={profileFormInputs__item}>
                  <FormInput type='text' name='userPassword' placeholder='пароль' value={formProfileValues.userPassword}
                             changeHandler={changeInputProfileFormValueHandler}/>
                </li>
                <li className={profileFormInputs__item}>
                  <FormInput type='text' name='userConfirmPassword' placeholder='подтвердите пароль'
                             value={formProfileValues.userConfirmPassword}
                             changeHandler={changeInputProfileFormValueHandler}/>
                </li>
              </ul>
              <div className={profileFormInputs__sendBtn}>
                <button type='submit'>Сохранить</button>
              </div>

            </div>
            <div className={profileFormAvatar}>
              <label htmlFor='userAvatar'>Ваш аватар</label>
              <input type="file" name='userAvatar' id='userAvatar'/>
            </div>
          </form>
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

export default ProfilePage
