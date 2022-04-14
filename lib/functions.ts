import type {
  IsStrongPassword,
  SetDynamicClasses,
  SetStaticClasses,
} from '../typescript/interfaces'

import validator from 'validator'

export const setStaticClasses: SetStaticClasses = (classes) => classes.join(' ')

export const setDynamicClasses: SetDynamicClasses = (args): string => {
  const { staticClasses, dynamicClasses, conditions } = args

  let dynamic = ''

  console.log()

  if (dynamicClasses.length < 1) {
    if (conditions[0])
      return staticClasses.join(' ') + ' ' + dynamicClasses[0].join(' ')
  }

  for (let i = 0; i < dynamicClasses.length; i++) {
    if (conditions[i]) dynamic += ' ' + dynamicClasses[i].join(' ')
  }

  return staticClasses.join(' ') + dynamic
}

export const isStrongPassword: IsStrongPassword = (password, options) => {
  let boo = false

  if (options.minLenght !== undefined) {
    const isMinLenght = validator.isLength(password, {
      min: options.minLenght,
    })

    boo = isMinLenght
  }

  if (options.minUppercase !== undefined) {
    const uppercaseCounter = password.match(/[A-Z]|[А-ЯЁ]/g)
    const isPasswordUppercase =
      uppercaseCounter !== null &&
      uppercaseCounter.length >= options.minUppercase

    boo = isPasswordUppercase
  }

  if (options.minNumbers !== undefined) {
    const minNumbersCounter = password.match(/\d/g)
    const isMinNumbers =
      minNumbersCounter !== null &&
      minNumbersCounter.length >= options.minNumbers

    boo = isMinNumbers
  }

  return boo
}
