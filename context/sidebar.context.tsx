import type { ChildrenProps, TSidebarContext } from '../typescript/types'

import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext<TSidebarContext | null>(null)

export const SidebarContextProvider = ({ children }: ChildrenProps) => {
  const [isSidebarActive, setIsActive] = useState(false)

  const toggleSidebarState = () => {
    setIsActive((prev) => !prev)
  }

  const valueContext: TSidebarContext = { isSidebarActive, toggleSidebarState }

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
