import type {ChangeEventHandler, ReactFragment, ReactNode} from 'react'
import {ResponseMessageType} from './enums'


export type ChildrenProps = {
  children:
    | ReactNode
    | ReactNode[]
    | JSX.Element
    | JSX.Element[]
    | string
    | string[]
    | ReactFragment
}

export type ResponseData<DataType = null> = {
  success: boolean
  data: DataType
  message: string
}

export type StrongPasswordOptions = {
  minLenght?: number
  minUppercase?: number
  minNumbers?: number
}

export type RequirementsPasswordState = {
  isMinLenght: boolean | undefined
  isMinUppercase: boolean | undefined
  isMinNumbers: boolean | undefined
}

export type ValidationProp = {
  handler: ChangeEventHandler
  state?: boolean
  message?: string
}

export type RequirementFiled = {
  message: string
  state: boolean | undefined
}

export type RequirementsList = {
  minLenght?: RequirementFiled
  minUppercase?: RequirementFiled
  minNumbers?: RequirementFiled
}

export type RequirementsProp = {
  handler: ChangeEventHandler
  list: RequirementsList
  hideState?: boolean
}

export type FormInputProps = {
  className?: string
  label?: string
  type: string
  name: string
  id?: string
  value: string
  placeholder?: string
  disabled?: boolean
  height?: string
  inputRef?: React.Ref<HTMLInputElement>
  changeHandler: ChangeEventHandler<HTMLInputElement>
  validation?: ValidationProp
  requirements?: RequirementsProp
  blurState?: boolean
  hideState?: boolean
  isLastInput?: boolean
}

export type ResponseMessageState = {
  type: ResponseMessageType | undefined
  message: string | undefined
  isHideMessage: boolean
}

export type ResponseMessageProps = {
  message: string | undefined
  type: string | undefined
  isHideMessage: boolean
  closeResponseMessage: () => void
}

