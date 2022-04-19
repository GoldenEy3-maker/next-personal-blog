import type { ChangeEventHandler, FormEventHandler } from 'react'

import { useRouter } from 'next/router'

import { useState } from 'react'

import { useSearchContext } from '../context/search.context'

import { setDynamicClasses } from '../lib/functions'

import styles from '../styles/modules/Header.module.scss'
import { RoutePaths } from '../typescript/enums'

const {
  headerSearchForm,
  headerSearchForm__input,
  _isSeachTyping,
  _isSeachFocus,
} = styles

const SearchBar = () => {
  const [isFocus, setIsFocus] = useState(false)

  const { searchValue, setSearchValue } = useSearchContext()
  const router = useRouter()

  const changeSearchValueHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchValue(event.target.value)
  }

  const focusSeachInputHandler = () => {
    setIsFocus(true)
  }

  const blurSearchInputHandler = () => {
    setIsFocus(false)
  }

  const submitSearchFormHandler: FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault()

    if (router.route) {
      router.push(RoutePaths.SearchPage)
    }
  }

  return (
    <form
      className={setDynamicClasses({
        staticClasses: [headerSearchForm],
        dynamicClasses: [[_isSeachFocus], [_isSeachTyping]],
        conditions: [isFocus, searchValue !== ''],
      })}
      onSubmit={submitSearchFormHandler}
    >
      <input
        type='text'
        className={headerSearchForm__input}
        value={searchValue}
        onChange={changeSearchValueHandler}
        onFocus={focusSeachInputHandler}
        onBlur={blurSearchInputHandler}
      />
      <span>Поиск по блогу</span>
    </form>
  )
}

export default SearchBar
