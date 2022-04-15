import type { GetServerSideProps, NextPage } from 'next'
import { ChangeEventHandler, FormEventHandler, useRef } from 'react'
import type { AuthValues } from '../typescript/interfaces'
import type {
  RequirementsPasswordState,
  ResponseData,
  ResponseMessageState,
} from '../typescript/types'
import {
  CookieType,
  ResponseMessageType,
  ValidationFormWarnings,
} from '../typescript/enums'

import { useRouter } from 'next/router'
import { useState } from 'react'

import AuthLayout from '../components/AuthLayout'
import FormInput from '../components/FormInput'
import ResponseMessage from '../components/ResponseMessage'

import { useHttp } from '../hooks/http.hook'

import { isStrongPassword } from '../lib/functions'

import validator from 'validator'
import { removeCookies, setCookies } from 'cookies-next'

import styles from '../styles/modules/Auth.module.scss'

enum ValidationFiledsState {
  IsPasswordConfirm = 'isPasswordConfirm',
  IsEmailCorrect = 'isEmailCorrect',
}

enum RequirementsPasswordFieldsState {
  IsMinLenght = 'isMinLenght',
  IsMinUppercase = 'isMinUppercase',
  IsMinNumbers = 'isMinNumbers',
}

enum RequirementsPasswordMessages {
  minLenght = 'Минимальная длина пароля должна быть 6 символов',
  minUppercase = 'Пароль должен содержать хотя бы одну заглавную букву',
  minNumbers = 'Пароль должен содержать хотя бы одну цифру',
}

type validationValue = {
  isPasswordConfirm: undefined | boolean
  isEmailCorrect: undefined | boolean
}

const {
  auth,
  auth__inner,
  authForm,
  authFormInputs,
  authFormInputs__list,
  authFormInputsItem,
  auth__title,
  authFormControls,
} = styles

const AuthPage: NextPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(false)
  const [globalValueInput, setGlobalValueInput] = useState<AuthValues>({
    email: '',
    password: '',
  })
  const [registerValueInput, setRegisterValueInput] = useState({
    name: '',
    confirmPassword: '',
  })
  const [validationValue, setValidationValue] = useState<validationValue>({
    isPasswordConfirm: undefined,
    isEmailCorrect: undefined,
  })
  const [requirementsPasswordState, setRequirementsPasswordState] =
    useState<RequirementsPasswordState>({
      isMinLenght: undefined,
      isMinUppercase: undefined,
      isMinNumbers: undefined,
    })

  const [responseMessageState, setResponseMessageState] =
    useState<ResponseMessageState>({
      type: undefined,
      message: undefined,
      isHideMessage: true,
    })

  const passwordInputRef = useRef<HTMLInputElement | null>(null)
  const { request, isReguestInProcess } = useHttp()
  const router = useRouter()

  const requirementsPasswordList = {
    minLenght: {
      message: RequirementsPasswordMessages.minLenght,
      state: requirementsPasswordState.isMinLenght,
    },
    minUppercase: {
      message: RequirementsPasswordMessages.minUppercase,
      state: requirementsPasswordState.isMinUppercase,
    },
    minNumbers: {
      message: RequirementsPasswordMessages.minNumbers,
      state: requirementsPasswordState.isMinNumbers,
    },
  }

  const changeValidationValue = (
    validator: string,
    value: boolean | undefined
  ) => {
    setValidationValue((state) => ({ ...state, [validator]: value }))
  }

  const changeRequirementsState = (
    requirment: string,
    value: boolean | undefined
  ) => {
    setRequirementsPasswordState((state) => ({ ...state, [requirment]: value }))
  }

  const resetRequirmentState = () => {
    setRequirementsPasswordState((state) => ({
      ...state,
      isMinLenght: undefined,
      isMinUppercase: undefined,
      isMinNumbers: undefined,
    }))
  }

  const handlerChangeGlobalValue: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setGlobalValueInput((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }))
  }

  const handlerChangeRegisterValue: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setRegisterValueInput((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }))
  }

  const handlerRequirmentsPassword: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const currentValue = event.target.value

    const isMinLentgh = isStrongPassword(currentValue, {
      minLenght: 6,
    })
    const isMinUppercase = isStrongPassword(currentValue, {
      minUppercase: 1,
    })

    const isMinNumbers = isStrongPassword(currentValue, {
      minNumbers: 1,
    })

    changeRequirementsState(
      RequirementsPasswordFieldsState.IsMinLenght,
      isMinLentgh
    )
    changeRequirementsState(
      RequirementsPasswordFieldsState.IsMinUppercase,
      isMinUppercase
    )
    changeRequirementsState(
      RequirementsPasswordFieldsState.IsMinNumbers,
      isMinNumbers
    )

    if (currentValue === '') resetRequirmentState()
  }

  const validationRegisterConfirmPassword: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const currentName = event.target.name
    const currentValue = event.target.value
    const isConfirmPasswordInput = currentName === 'confirmPassword'
    const isGlobalValueInputMatches = globalValueInput.password === currentValue
    const isRegisterValueInputMatches =
      registerValueInput.confirmPassword === currentValue

    if (
      isConfirmPasswordInput
        ? globalValueInput.password === ''
        : registerValueInput.confirmPassword === ''
    )
      return

    changeValidationValue(
      ValidationFiledsState.IsPasswordConfirm,
      isConfirmPasswordInput
        ? isGlobalValueInputMatches
        : isRegisterValueInputMatches
    )

    if (currentValue === '')
      changeValidationValue(ValidationFiledsState.IsPasswordConfirm, undefined)
  }

  const validationRegisterEmail: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const currentValue = event.target.value
    const isValidEmail = validator.isEmail(currentValue)

    changeValidationValue(ValidationFiledsState.IsEmailCorrect, isValidEmail)

    if (currentValue === '')
      changeValidationValue(ValidationFiledsState.IsEmailCorrect, undefined)
  }

  const showResponseMessage = (type: ResponseMessageType, message: string) => {
    setResponseMessageState((state) => ({
      ...state,
      type: type,
      message: message,
      isHideMessage: false,
    }))
  }

  const closeResponseMessage = () => {
    setResponseMessageState((state) => ({ ...state, isHideMessage: true }))
  }

  const toggleFormLogin = () => {
    closeResponseMessage()
    setIsLoginForm((state) => !state)
  }

  const submitFormHandler: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    const isInputsEmpty = !isLoginForm
      ? registerValueInput.confirmPassword === '' ||
        registerValueInput.name === '' ||
        globalValueInput.email === '' ||
        globalValueInput.password === ''
      : globalValueInput.email === '' || globalValueInput.password === ''

    const isInputsNotValid = !isLoginForm
      ? !validationValue.isEmailCorrect ||
        !validationValue.isPasswordConfirm ||
        !requirementsPasswordState.isMinLenght ||
        !requirementsPasswordState.isMinUppercase ||
        !requirementsPasswordState.isMinNumbers
      : false

    if (isInputsEmpty) {
      showResponseMessage(
        ResponseMessageType.Warning,
        ValidationFormWarnings.EmptyValues
      )

      return
    }

    if (isInputsNotValid) {
      showResponseMessage(
        ResponseMessageType.Warning,
        ValidationFormWarnings.NotValid
      )

      return
    }

    if (!responseMessageState.isHideMessage) closeResponseMessage()

    const url = !isLoginForm ? '/api/auth/register' : '/api/auth/login'

    const body = !isLoginForm
      ? { ...globalValueInput, ...registerValueInput }
      : globalValueInput

    const response = await request<ResponseData>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.success) {
      showResponseMessage(ResponseMessageType.Danger, response.message)

      return
    }

    showResponseMessage(ResponseMessageType.Success, response.message)

    setTimeout(() => {
      if (!isLoginForm) {
        closeResponseMessage()
        setIsLoginForm(true)
        passwordInputRef.current?.focus()
      } else {
        router.push('/user/home')
      }
    }, 1500)
  }

  return (
    <AuthLayout>
      <div className={auth}>
        <div className={auth__inner}>
          <h1 className={auth__title}>
            {isLoginForm ? 'Авторизация' : 'Регистрация'}
          </h1>
          <form className={authForm} onSubmit={submitFormHandler} noValidate>
            <div className={authFormInputs}>
              <ul className={authFormInputs__list}>
                <li className={authFormInputsItem}>
                  <FormInput
                    label='Ваше имя'
                    type='text'
                    name='name'
                    id='name'
                    placeholder='имя'
                    value={registerValueInput.name}
                    disabled={isReguestInProcess}
                    height='70px'
                    changeHandler={handlerChangeRegisterValue}
                    blurState={isLoginForm}
                    hideState={isLoginForm}
                  />
                </li>
                <li className={authFormInputsItem}>
                  <FormInput
                    label='Введите email'
                    type='email'
                    name='email'
                    id='email'
                    placeholder='email'
                    value={globalValueInput.email}
                    disabled={isReguestInProcess}
                    height={
                      validationValue.isEmailCorrect !== undefined &&
                      !validationValue.isEmailCorrect
                        ? '100px'
                        : '70px'
                    }
                    changeHandler={handlerChangeGlobalValue}
                    validation={{
                      handler: validationRegisterEmail,
                      state: validationValue.isEmailCorrect,
                      message: ValidationFormWarnings.EmailIsNotCorrect,
                    }}
                    blurState={isLoginForm}
                  />
                </li>
                <li className={authFormInputsItem}>
                  <FormInput
                    label={isLoginForm ? 'Введите пароль' : 'Придумайте пароль'}
                    type='password'
                    name='password'
                    id='password'
                    placeholder={isLoginForm ? 'пароль' : 'новый пароль'}
                    value={globalValueInput.password}
                    disabled={isReguestInProcess}
                    inputRef={passwordInputRef}
                    height={
                      !isLoginForm && globalValueInput.password !== ''
                        ? '245px'
                        : '70px'
                    }
                    changeHandler={handlerChangeGlobalValue}
                    validation={{
                      handler: validationRegisterConfirmPassword,
                    }}
                    requirements={{
                      handler: handlerRequirmentsPassword,
                      list: requirementsPasswordList,
                      hideState: isLoginForm,
                    }}
                    blurState={isLoginForm}
                    isLastInput={isLoginForm ? true : undefined}
                  />
                </li>
                <li className={authFormInputsItem}>
                  <FormInput
                    label='Подтвердите пароль'
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder='пароль'
                    value={registerValueInput.confirmPassword}
                    disabled={isReguestInProcess}
                    height={
                      !isLoginForm &&
                      validationValue.isPasswordConfirm !== undefined &&
                      !validationValue.isPasswordConfirm
                        ? '100px'
                        : '70px'
                    }
                    changeHandler={handlerChangeRegisterValue}
                    validation={{
                      handler: validationRegisterConfirmPassword,
                      state: validationValue.isPasswordConfirm,
                      message: !isLoginForm
                        ? ValidationFormWarnings.ConfirmPasswodIsNotValid
                        : undefined,
                    }}
                    blurState={isLoginForm}
                    hideState={isLoginForm}
                    isLastInput={!isLoginForm ? true : undefined}
                  />
                </li>
              </ul>
            </div>
            <ResponseMessage
              {...responseMessageState}
              closeResponseMessage={closeResponseMessage}
            />
            <div className={authFormControls}>
              <button type='submit' disabled={isReguestInProcess}>
                {isReguestInProcess
                  ? 'Отправляется...'
                  : isLoginForm
                  ? 'Войти'
                  : 'Зарегистрироваться'}
              </button>
              <button
                type='button'
                onClick={toggleFormLogin}
                disabled={isReguestInProcess}
              >
                {isLoginForm ? 'Регистрация' : 'Авторизация'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const authTokenCookie = req.cookies[CookieType.Authorization]
  const _alreadyLoggedCookie = req.cookies[CookieType.AlreadyLogged]

  if (authTokenCookie && _alreadyLoggedCookie === undefined) {
    setCookies(CookieType.AlreadyLogged, 1, { req, res })

    return {
      redirect: {
        destination: '/user/home',
        permanent: false,
      },
    }
  }

  if (authTokenCookie === undefined && _alreadyLoggedCookie) {
    removeCookies(CookieType.AlreadyLogged, { req, res })
  }

  return {
    props: {},
  }
}

export default AuthPage
