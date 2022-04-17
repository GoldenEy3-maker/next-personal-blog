import type {GenericReguestFn} from '../typescript/interfaces'

import {useCallback, useState} from 'react'


export const useHttp = () => {
  const [isRequestInProcess, setIsRequestInProcess] = useState<boolean>(false)

  const request: GenericReguestFn = useCallback(async (url, options) => {
    setIsRequestInProcess(true)
    try {
      const response = await fetch(url, options)
      const responseData = await response.json()

      setIsRequestInProcess(false)
      return responseData
    } catch (err: any) {
      setIsRequestInProcess(false)
      return {
        success: false,
        data: null,
        message: 'Что-то пошло не так, попробуйте снова',
      }
    }
  }, [])

  return {isRequestInProcess, request}
}
