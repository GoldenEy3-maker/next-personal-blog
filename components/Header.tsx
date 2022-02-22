import Navigation from './Navigation'

import styles from '../styles/modules/Header.module.scss'

import { useSidebarContext } from './context/sidebarContext'
import { setDynamicClasses } from '../helpers'

const Header = () => {
  const { state, handleToggleState } = useSidebarContext()

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.header__left}>
          <Navigation />
          <div
            className={setDynamicClasses(
              styles.burger,
              styles.__burgerActive,
              state
            )}
            onClick={handleToggleState}
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
