import type {ChildrenProps} from '../typescript/types'
import type {SidebarContextStorage} from '../typescript/interfaces'

import {createContext, useContext, useEffect, useState} from 'react'

import {useScroll} from "../hooks/scroll.hook";
import {useWindowResize} from "../hooks/window.hook";

const SidebarContext = createContext<SidebarContextStorage | null>(null)

export const SidebarContextProvider = ({children}: ChildrenProps) => {
  const [isSidebarActive, setIsActive] = useState(false)

  const {toggleLockBody, unlockBody} = useScroll()
  const isLaptopSize = useWindowResize()

  const toggleSidebarState = () => {
    setIsActive((prev) => !prev)

    toggleLockBody(!isSidebarActive)
  }

  useEffect(() => {
    if (!isLaptopSize) {
      setIsActive(false)
      unlockBody()
    }
  }, [isLaptopSize, unlockBody])

  return (
    <SidebarContext.Provider value={{isSidebarActive, toggleSidebarState}}>
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

  return {...context}
}
