import type { FormInputComponent } from '../typescript/interfaces'

import React, {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { setDynamicClasses } from '../lib/functions'

import styles from '../styles/modules/FormInput.module.scss'

const {
  formInputsItem,
  _focus,
  _typing,
  formInputsItem__label,
  formInputsItem__input,
  _validError,
  formInputsItem__validMessage,
  _hideValidMessage,
  _hideInputItem,
  _lastInput,
  fromInputsItemRequirements,
  fromInputsItemRequirements__list,
  fromInputsItemRequirements__item,
  _requirementsComplete,
  _requirementsError,
  _hideRequirements,
} = styles

const FormInput: FormInputComponent = ({
  className,
  label,
  type,
  name,
  id,
  value,
  placeholder,
  disabled,
  height = '100%',
  inputRef,
  changeHandler,
  validation,
  requirements,
  blurState,
  hideState,
  isLastInput,
}) => {
  const [isFocusInput, setIsFocusInput] = useState(false)

  const handlerFocusInput = () => {
    setIsFocusInput(true)
  }

  const handlerBlurInput = useCallback(() => {
    if (value === '') {
      setIsFocusInput(false)
    } else {
      setIsFocusInput(true)
    }
  }, [value])

  const changeHandlersCombine = (
    event: ChangeEvent<HTMLInputElement>,
    ...functions: ChangeEventHandler<HTMLInputElement>[]
  ) => {
    changeHandler(event)

    if (functions.length > 1) {
      functions.forEach((fn) => fn(event))
    } else {
      functions[0](event)
    }
  }

  const getChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (validation !== undefined && requirements !== undefined)
      return changeHandlersCombine(
        event,
        requirements.handler,
        validation.handler
      )

    if (validation !== undefined)
      return changeHandlersCombine(event, validation.handler)

    if (requirements !== undefined)
      return changeHandlersCombine(event, requirements.handler)

    return changeHandler(event)
  }

  const getStaticClasses = () => {
    const staticClasses = [formInputsItem]

    if (className) staticClasses.unshift(className)

    return staticClasses
  }

  const getDynamicClasses = () => {
    const dynamicClasses = [[_focus], [_typing]]

    if (validation !== undefined && validation.state !== undefined)
      dynamicClasses.push([_validError])

    if (hideState !== undefined) dynamicClasses.push([_hideInputItem])

    if (isLastInput !== undefined) dynamicClasses.push([_lastInput])

    return dynamicClasses
  }

  const getConditionsClasses = () => {
    const conditions = [isFocusInput, value !== '']

    if (validation && validation.state !== undefined)
      conditions.push(!validation.state)

    if (hideState !== undefined) conditions.push(hideState)

    if (isLastInput !== undefined) conditions.push(isLastInput)

    return conditions
  }

  const setInlineStylesVariable = (name: string, value: string) => {
    return { [name]: value } as React.CSSProperties
  }

  useEffect(() => {
    if (blurState !== undefined) {
      handlerBlurInput()
    }
  }, [blurState, handlerBlurInput])

  return (
    <div
      className={setDynamicClasses({
        staticClasses: getStaticClasses(),
        dynamicClasses: getDynamicClasses(),
        conditions: getConditionsClasses(),
      })}
      style={setInlineStylesVariable('--input-height', height)}
    >
      <label htmlFor={id} className={formInputsItem__label}>
        {label}
      </label>
      <div className={formInputsItem__input}>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          ref={inputRef}
          onFocus={handlerFocusInput}
          onBlur={handlerBlurInput}
          onChange={(event) => getChangeHandler(event)}
        />
        <span>{placeholder}</span>
      </div>
      {validation?.message !== undefined && (
        <div
          className={setDynamicClasses({
            staticClasses: [formInputsItem__validMessage],
            dynamicClasses: [[_hideValidMessage]],
            conditions: [validation.state === undefined || validation.state],
          })}
        >
          {validation.message}
        </div>
      )}
      {requirements !== undefined && (
        <div
          className={setDynamicClasses({
            staticClasses: [fromInputsItemRequirements],
            dynamicClasses: [[_hideRequirements]],
            conditions: [
              requirements.hideState !== undefined && requirements.hideState,
            ],
          })}
        >
          <ul className={fromInputsItemRequirements__list}>
            {requirements.list.minLenght !== undefined && (
              <li
                className={setDynamicClasses({
                  staticClasses: [fromInputsItemRequirements__item],
                  dynamicClasses: [
                    [_requirementsComplete],
                    [_requirementsError],
                  ],
                  conditions: [
                    requirements.list.minLenght.state === true,
                    requirements.list.minLenght.state === false,
                  ],
                })}
              >
                <div className='fromInputsItemRequirements__message'>
                  {requirements.list.minLenght.message}
                </div>
              </li>
            )}
            {requirements.list.minUppercase !== undefined && (
              <li
                className={setDynamicClasses({
                  staticClasses: [fromInputsItemRequirements__item],
                  dynamicClasses: [
                    [_requirementsComplete],
                    [_requirementsError],
                  ],
                  conditions: [
                    requirements.list.minUppercase.state === true,
                    requirements.list.minUppercase.state === false,
                  ],
                })}
              >
                {requirements.list.minUppercase.message}
              </li>
            )}
            {requirements.list.minNumbers !== undefined && (
              <li
                className={setDynamicClasses({
                  staticClasses: [fromInputsItemRequirements__item],
                  dynamicClasses: [
                    [_requirementsComplete],
                    [_requirementsError],
                  ],
                  conditions: [
                    requirements.list.minNumbers.state === true,
                    requirements.list.minNumbers.state === false,
                  ],
                })}
              >
                {requirements.list.minNumbers.message}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FormInput
