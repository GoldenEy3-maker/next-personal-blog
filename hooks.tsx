import { useEffect, useState } from 'react'

export const useWindowResize = () => {
  const [isLaptopSize, setIsLaptopSize] = useState<boolean>(false)

  const handleResizeListener = () => {
    if (window.innerWidth <= 991.98) {
      setIsLaptopSize(true)
    } else {
      setIsLaptopSize(false)
    }
  }

  useEffect(() => {
    if (window.innerWidth <= 991.98) setIsLaptopSize(true)

    window.addEventListener('resize', handleResizeListener)

    return () => window.removeEventListener('resize', handleResizeListener)
  }, [])

  return isLaptopSize
}
