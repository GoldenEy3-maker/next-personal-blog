import type { ChildrenProps } from '../typescript/types'
import type {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
} from 'react'

import { createContext, useState, useContext } from 'react'

interface SearchValueByTagContent {
  <HTMLTag>(event: MouseEvent<HTMLTag>): void
}

interface SearchContextStorage {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  setSearchValueByTagContent: MouseEventHandler<HTMLAnchorElement>
}

const SeachContext = createContext<SearchContextStorage | null>(null)

export const SearchContextProvider = ({ children }: ChildrenProps) => {
  const [searchValue, setSearchValue] = useState('')

  const setSearchValueByTagContent: MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    setSearchValue(
      event.currentTarget.textContent !== null
        ? event.currentTarget.textContent
        : ''
    )
  }

  const value = { searchValue, setSearchValue, setSearchValueByTagContent }

  return <SeachContext.Provider value={value}>{children}</SeachContext.Provider>
}

export const useSearchContext = () => {
  const context = useContext(SeachContext)

  if (context == undefined) {
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider'
    )
  }

  return { ...context }
}
