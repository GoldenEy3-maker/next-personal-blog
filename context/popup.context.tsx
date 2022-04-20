import type {ChildrenProps} from "../typescript/types";

import {createContext, useContext, useEffect, useState} from "react";

import {useScroll} from "../hooks/scroll.hook";

export interface PopupContextStorage {
  popupState: {
    contactPopup: boolean
    sharePopup: boolean
  }
  openPopup: (popupName: string) => void
  closePopup: (popupName: string) => void
}

const PopupContext = createContext<PopupContextStorage | null>(null)

export const PopupContextProvider = ({children}: ChildrenProps) => {
  const [popupState, setPopupState] = useState({
    contactPopup: false,
    sharePopup: false
  })

  const {lockBody, unlockBody, getScrollbarCompensation, setScrollbarCompensationState} = useScroll()

  const openPopup = (popupName: string) => {
    setPopupState(state => ({...state, [popupName]: true}))
    lockBody()
  }

  const closePopup = (popupName: string) => {
    setPopupState(state => ({...state, [popupName]: false}))
    unlockBody()
  }

  useEffect(() => {
    const compensation = getScrollbarCompensation()
    setScrollbarCompensationState(compensation)
  }, [getScrollbarCompensation, setScrollbarCompensationState])

  return (<PopupContext.Provider value={{popupState, openPopup, closePopup}}>
    {children}
  </PopupContext.Provider>)
}

export const usePopupContext = () => {
  const context = useContext(PopupContext)

  if (context == undefined) {
    throw new Error(`usePopupContext must be used within a PopupContextProvider`)
  }

  return context
}