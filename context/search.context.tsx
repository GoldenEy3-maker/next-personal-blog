import type {ChildrenProps} from '../typescript/types'
import type {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
} from 'react'

import {createContext, useState, useContext} from 'react'
import {useDebounce} from "../hooks/debounce.hook";

interface SearchValueByTagContent {
  <HTMLTag>(event: MouseEvent<HTMLTag>): void
}

interface SearchContextStorage {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  setSearchValueByTagContent: MouseEventHandler<HTMLAnchorElement>
  debouncedSearchValue: string
}

const SearchContext = createContext<SearchContextStorage | null>(null)

export const SearchContextProvider = ({children}: ChildrenProps) => {
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const setSearchValueByTagContent: MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    setSearchValue(
      event.currentTarget.textContent !== null
        ? event.currentTarget.textContent
        : ''
    )
  }

  return <SearchContext.Provider
    value={{
      searchValue,
      setSearchValue,
      setSearchValueByTagContent,
      debouncedSearchValue
    }}>{children}</SearchContext.Provider>
}

export const useSearchContext = () => {
  const context = useContext(SearchContext)

  if (context == undefined) {
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider'
    )
  }

  return {...context}
}
