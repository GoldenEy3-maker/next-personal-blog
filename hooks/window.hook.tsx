import {WindowResolutions} from "../typescript/enums";

import {useEffect, useState} from 'react'


export const useWindowResize = () => {
  const [isWindowInLaptopSize, setIsWindowInLaptopSize] =
    useState<boolean>(false)


  const handleWindowResizeListener = () => {
    setIsWindowInLaptopSize(window.innerWidth <= WindowResolutions.LaptopSize)
  }


  useEffect(() => {
    setIsWindowInLaptopSize(window.innerWidth <= WindowResolutions.LaptopSize)

    window.addEventListener('resize', handleWindowResizeListener)

    return () => window.removeEventListener('resize', handleWindowResizeListener)
  }, [])

  return isWindowInLaptopSize
}
