import Navigation from './Navigation'

import SearchBar from './SearchBar'

import {useSidebarContext} from '../context/sidebar.context'

import {setDynamicClasses} from '../lib/functions'

import styles from '../styles/modules/Header.module.scss'
import {useEffect} from "react";
import {usePopupContext} from "../context/popup.context";

const {
  header,
  header__inner,
  header__left,
  burger,
  _burgerActive,
  burger__inner,
  header__right,
} = styles

const Header = () => {
  const {isSidebarActive, toggleSidebarState} = useSidebarContext()

  return (
    <header className={header}>
      <div className={header__inner}>
        <div className={header__left}>
          <Navigation/>
          <div
            className={setDynamicClasses({
              staticClasses: [burger],
              dynamicClasses: [[_burgerActive]],
              conditions: [isSidebarActive],
            })}
            onClick={toggleSidebarState}
          >
            <div className={burger__inner}>
              <span></span>
            </div>
          </div>
        </div>
        <div className={header__right}>
          <SearchBar/>
        </div>
      </div>
    </header>
  )
}

export default Header
