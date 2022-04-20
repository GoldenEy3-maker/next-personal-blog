import type {ChildrenProps} from "../typescript/types";

import styles from '../styles/modules/Popup.module.scss'
import {ReactFragment, ReactNode} from "react";
import {usePopupContext} from "../context/popup.context";
import {setDynamicClasses} from "../lib/functions";

interface PopupLayoutProps {
  children: ReactNode
    | ReactNode[]
    | JSX.Element
    | JSX.Element[]
    | string
    | string[]
    | ReactFragment
  name: string
}

const {popup, popup__inner, popupClose, popupClose__inner, _openPopup} = styles

const PopupLayout = ({children, name}: PopupLayoutProps) => {
  const {closePopup, popupState} = usePopupContext()

  return (
    <div className={setDynamicClasses({
      staticClasses: [popup],
      dynamicClasses: [[_openPopup]],
      // @ts-ignore
      conditions: [popupState[name]]
    })} onClick={() => closePopup(name)}>
      <div className={popup__inner} onClick={(event) => event.stopPropagation()}>
        <div className={popupClose} onClick={(event) => closePopup(name)}>
          <div className={popupClose__inner}/>
        </div>
        {children}
      </div>
    </div>
  )
}

export default PopupLayout