import Link from 'next/link'
import { MouseEvent } from 'react'

import styles from '../styles/modules/Navigation.module.scss'

const Navigation = () => {
  const clickNavItem = (event: MouseEvent<HTMLLIElement>) => {
    event.currentTarget.classList.toggle(styles.__active_submenu)
  }

  return (
    <nav className={styles.nav} data-navigation-selector>
      <div className={styles.nav__flexContainer}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <Link href=''>
              <a>Главная</a>
            </Link>
          </li>
          <li
            className={`${styles.nav__item} ${styles.__submenu}`}
            onClick={clickNavItem}
          >
            <Link href=''>
              <a>
                Статьи
                <span className={styles.nav__item_icon}>
                  <svg
                    width='14'
                    height='9'
                    viewBox='0 0 10 5'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M5 5L0.669872 0.5L9.33013 0.5L5 5Z' fill='white' />
                  </svg>
                </span>
              </a>
            </Link>

            <div className={styles.navSubmenu}>
              <ul className={styles.navSubmenu__list}>
                <li className={styles.navSubmenu__item}>
                  <Link href=''>
                    <a>Создание сайтов</a>
                  </Link>
                </li>
                <li className={styles.navSubmenu__item}>
                  <Link href=''>
                    <a>Интернет-маркетинг</a>
                  </Link>
                </li>
                <li className={styles.navSubmenu__item}>
                  <Link href=''>
                    <a>Продвижение видео</a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={styles.nav__item}>
            <Link href=''>
              <a>Обо мне</a>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href=''>
              <a>Реклама</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.nav__flexContainer}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <Link href=''>
              <a>Профиль</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
