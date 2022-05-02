import {useEffect, useState} from "react";

interface DebounceHookInterface {
  (value: any, delay?: number): any
}


export const useDebounce: DebounceHookInterface = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)


    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}