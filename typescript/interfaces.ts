import type { NextApiRequest, NextApiResponse } from 'next'
import type {
  FormInputProps,
  ResponseMessageProps,
  StrongPasswordOptions,
} from './types'

export interface SidebarContext {
  isActive: boolean
  toggleActiveState: () => void
}

export interface SetStaticClasses {
  (classes: string[]): string
}

export interface SetDynamicClasses {
  (args: {
    staticClasses: string[]
    dynamicClasses: string[][]
    conditions: boolean[]
  }): string
}

export interface IsStrongPassword {
  (password: string, options: StrongPasswordOptions): boolean
}

export interface Endpoint<ResponseData> {
  (req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void>
}

export interface GenericReguestFn {
  <ResponseData>(url: string, options?: RequestInit): Promise<ResponseData>
}

export interface AuthValues {
  email: string
  password: string
}

export interface RegisterValues extends AuthValues {
  name: string
  confirmPassword: string
}

export interface FormInputComponent {
  (props: FormInputProps): JSX.Element
}

export interface ResponseMessageComponent {
  (porops: ResponseMessageProps): JSX.Element
}
