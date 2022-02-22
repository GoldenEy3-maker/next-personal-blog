import Link from 'next/link'
import { MouseEvent, useEffect, useRef, useState } from 'react'

import styles from '../styles/modules/Navigation.module.scss'

import { useWindowContext } from './context/globalWindowContext'

import { setDynamicClasses } from '../helpers'

type TSubmenuState = {
  height: number | undefined
  isActive: boolean
}

const Navigation = () => {
  const [submenuState, setSubmenuState] = useState<TSubmenuState>({
    height: undefined,
    isActive: true,
  })

  const isLaptopSize = useWindowContext()

  const refSubmenu = useRef<HTMLDivElement>(null)

  const toggleSubmenu = () => {
    setSubmenuState((state) => ({ ...state, isActive: !state.isActive }))
  }

  useEffect(() => {
    if (window.innerWidth <= 991.98) {
      setSubmenuState((state) => ({
        ...state,
        height: refSubmenu.current?.clientHeight,
        isActive: false,
      }))
    }
  }, [])

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
            className={setDynamicClasses(
              styles.nav__item,
              styles.__active_submenu,
              submenuState.isActive
            )}
            onClick={toggleSubmenu}
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

            <div
              ref={refSubmenu}
              className={styles.navSubmenu}
              style={
                isLaptopSize
                  ? {
                      height: submenuState.isActive
                        ? `${submenuState.height}px`
                        : 0,
                    }
                  : {}
              }
            >
              <ul
                className={styles.navSubmenu__list}
                onClick={(event: MouseEvent<HTMLUListElement>) =>
                  event.stopPropagation()
                }
              >
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
