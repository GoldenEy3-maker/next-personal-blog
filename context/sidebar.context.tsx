import type { ChildrenProps } from '../typescript/types'
import type { SidebarContext } from '../typescript/interfaces'

import { createContext, useContext, useState } from 'react'


const SidebarContext = createContext<SidebarContext | null>(null)

export const SidebarContextProvider = ({ children }: ChildrenProps) => {
  const [isActive, setIsActive] = useState(false)

  const toggleActiveState = () => {
    setIsActive((prev) => !prev)
  }

  const valueContext: SidebarContext = { isActive, toggleActiveState }

  return (
    <SidebarContext.Provider value={valueContext}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)

  if (context == undefined) {
    throw new Error(
      'useSidebarContext must be used within a SidebarContextProvider'
    )
  }

  return { ...context }
}
