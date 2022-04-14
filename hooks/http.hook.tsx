import { useCallback, useState } from 'react'
import { GenericReguestFn } from '../typescript/interfaces'

export const useHttp = () => {
  const [isReguestInProcess, setIsReguestInProcess] = useState<boolean>(false)

  const request: GenericReguestFn = useCallback(async (url, options) => {
    setIsReguestInProcess(true)
    try {
      const response = await fetch(url, options)
      const responseData = await response.json()

      setIsReguestInProcess(false)
      return responseData
    } catch (err: any) {
      setIsReguestInProcess(false)
      return {
        success: false,
        data: null,
        message: 'Что-то пошло не так, попробуйте снова',
      }
    }
  }, [])

  return { isReguestInProcess, request }
}
