import type {ChildrenProps} from "../typescript/types";

import {createContext, useContext, useState} from "react";

import {useScroll} from "../hooks/scroll.hook";

// export interface PopupContextStorage {
//
// }

const PopupContext = createContext<boolean | null>(null)

export const PopupContextProvider = ({children}: ChildrenProps) => {
  const [popupState, setPopupState] = useState(false)

  const {lockBody, unlockBody} = useScroll()

  const closePopup = () => {
    setPopupState(false)
    unlockBody()
  }

  const openPopup = () => {
    setPopupState(true)
    lockBody()
  }

  return (<PopupContext.Provider value={popupState}>
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