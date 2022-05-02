import type {ChangeEventHandler, FormEventHandler} from 'react'
import {RoutePaths} from '../typescript/enums'

import {useRouter} from 'next/router'

import {useState} from 'react'

import {useSearchContext} from '../context/search.context'

import {setDynamicClasses} from '../lib/functions'

import styles from '../styles/modules/Header.module.scss'

const {
  headerSearchForm,
  headerSearchForm__input,
  _isSearchTyping,
  _isSearchFocus,
} = styles

const SearchBar = () => {
  const [isFocus, setIsFocus] = useState(false)

  const router = useRouter()

  const {searchValue, setSearchValue} = useSearchContext()

  const changeSearchValueHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchValue(event.target.value)
  }

  const focusSearchInputHandler = () => {
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
        dynamicClasses: [[_isSearchFocus], [_isSearchTyping]],
        conditions: [isFocus, searchValue !== ''],
      })}
      onSubmit={submitSearchFormHandler}
    >
      <input
        type='text'
        className={headerSearchForm__input}
        value={searchValue}
        onChange={changeSearchValueHandler}
        onFocus={focusSearchInputHandler}
        onBlur={blurSearchInputHandler}
      />
      <span>Поиск по блогу</span>
    </form>
  )
}

export default SearchBar
