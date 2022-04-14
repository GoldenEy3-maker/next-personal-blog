import { useEffect, useState } from 'react'
import { LAPTOP_SIZE } from '../lib/vars'

export const useWindowResize = () => {
  const [isWindowInLaptopSize, setIsWindowInLaptopSize] =
    useState<boolean>(false)

  const handleResizeListener = () => {
    if (window.innerWidth <= LAPTOP_SIZE) {
      setIsWindowInLaptopSize(true)
    } else {
      setIsWindowInLaptopSize(false)
    }
  }

  useEffect(() => {
    if (window.innerWidth <= LAPTOP_SIZE) setIsWindowInLaptopSize(true)

    window.addEventListener('resize', handleResizeListener)

    return () => window.removeEventListener('resize', handleResizeListener)
  }, [])

  return isWindowInLaptopSize
}
