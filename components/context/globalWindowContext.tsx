import { createContext, useContext } from 'react'
import { TChildrenProps } from '../../types'
import { useWindowResize } from '../../hooks'

const WindowContext = createContext(false)

export const WindowContextProvider = ({ children }: TChildrenProps) => {
  const isLaptopSize = useWindowResize()

  return (
    <WindowContext.Provider value={isLaptopSize}>
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
