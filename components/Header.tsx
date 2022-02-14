import Navigation from './Navigation'

import styles from '../styles/modules/Header.module.scss'

import { TSidebarAndHeaderProps } from '../types'

const Header = ({
  handleSidebarState,
  sidebarIsOpen,
}: TSidebarAndHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.header__left}>
          <Navigation />
          <div
            className={`${styles.burger}${
              sidebarIsOpen ? ` ${styles.__burgerActive}` : ''
            }`}
            onClick={handleSidebarState}
          >
            <div className={styles.burger__inner}>
              <span></span>
            </div>
          </div>
        </div>
        <div className={styles.header__right}>
          <form className={styles.headerSearchForm}>
            <input
              type='text'
              className={styles.headerSearchForm__input}
              placeholder='Поиск по блогу'
            />
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header
