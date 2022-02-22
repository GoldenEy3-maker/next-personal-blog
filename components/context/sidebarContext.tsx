import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { TChildrenProps } from '../types'

type TSidebarContextState = {
  state: boolean
  dispatch: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext<TSidebarContextState | null>(null)

export const SidebarContextProvider = ({ children }: TChildrenProps) => {
  const [state, dispatch] = useState(false)

  const value: TSidebarContextState = { state, dispatch }

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)

  if (context == undefined) {
    throw new Error(
      'useSidebarContext must be used within a SidebarContextProvider'
    )
  }

  const { state, dispatch } = context

  const handleToggleState = () => {
    dispatch((prev) => !prev)
  }

  return { state, handleToggleState }
}
