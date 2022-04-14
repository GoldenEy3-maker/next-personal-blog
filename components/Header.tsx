import Navigation from './Navigation'

import { useSidebarContext } from '../context/sidebar.context'

import { setDynamicClasses } from '../lib/functions'

import styles from '../styles/modules/Header.module.scss'

const Header = () => {
  const { isActive, toggleActiveState } = useSidebarContext()

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.header__left}>
          <Navigation />
          <div
            className={setDynamicClasses({
              staticClasses: [styles.burger],
              dynamicClasses: [[styles.__burgerActive]],
              conditions: [isActive],
            })}
            onClick={toggleActiveState}
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
