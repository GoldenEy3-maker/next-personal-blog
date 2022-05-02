import type {ChildrenProps} from '../typescript/types'

import {createContext, useContext} from 'react'

import {useWindowResize} from '../hooks/window.hook'

const WindowContext = createContext<boolean>(false)

export const WindowContextProvider = ({children}: ChildrenProps) => {
  const isWindowInLaptopSize = useWindowResize()

  return (
    <WindowContext.Provider value={isWindowInLaptopSize}>
      {children}
    </WindowContext.Provider>
  )
}

export const useWindowContext = () => {
  const context = useContext(WindowContext)

  if (context === undefined) {
    throw new Error(
      'useWindowContext must be used within a WindowContextProvider'
    )
  }

  return context
}
