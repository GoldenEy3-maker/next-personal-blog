import type { MouseEvent } from 'react'
import { RoutePaths } from '../typescript/enums'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { useWindowContext } from '../context/window.context'

import { setDynamicClasses } from '../lib/functions'

import styles from '../styles/modules/Navigation.module.scss'

const {
  nav,
  nav__flexContainer,
  nav__list,
  nav__item,
  _active_submenu,
  nav__item_icon,
  navSubmenu,
  navSubmenu__list,
  navSubmenu__item,
} = styles

type SubmenuState = {
  height: number | undefined
  isActive: boolean
}

const Navigation = () => {
  const [submenuState, setSubmenuState] = useState<SubmenuState>({
    height: undefined,
    isActive: true,
  })

  const isWindowInLaptopSize = useWindowContext()

  const refSubmenu = useRef<HTMLDivElement>(null)

  const toggleSubmenu = () => {
    setSubmenuState((state) => ({ ...state, isActive: !state.isActive }))
  }

  const handleActivSubmenuHeight = () => {
    if (isWindowInLaptopSize) {
      return {
        height: submenuState.isActive ? `${submenuState.height}px` : 0,
      }
    }

    return {}
  }

  useEffect(() => {
    if (isWindowInLaptopSize) {
      setSubmenuState((state) => ({
        ...state,
        height: refSubmenu.current?.clientHeight,
        isActive: false,
      }))
    }
  }, [isWindowInLaptopSize])

  return (
    <nav className={nav} data-navigation-selector>
      <div className={nav__flexContainer}>
        <ul className={nav__list}>
          <li className={nav__item}>
            <Link href={RoutePaths.HomePage}>
              <a>Главная</a>
            </Link>
          </li>
          <li
            className={setDynamicClasses({
              staticClasses: [nav__item],
              dynamicClasses: [[_active_submenu]],
              conditions: [submenuState.isActive],
            })}
            onClick={toggleSubmenu}
          >
            <Link href='#'>
              <a>
                Статьи
                <span className={nav__item_icon}>
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
              className={navSubmenu}
              style={handleActivSubmenuHeight()}
            >
              <ul
                className={navSubmenu__list}
                onClick={(event: MouseEvent<HTMLUListElement>) =>
                  event.stopPropagation()
                }
              >
                <li className={navSubmenu__item}>
                  <Link href='#'>
                    <a>Создание сайтов</a>
                  </Link>
                </li>
                <li className={navSubmenu__item}>
                  <Link href='#'>
                    <a>Интернет-маркетинг</a>
                  </Link>
                </li>
                <li className={navSubmenu__item}>
                  <Link href='#'>
                    <a>Продвижение видео</a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={nav__item}>
            <Link href='#'>
              <a>Обо мне</a>
            </Link>
          </li>
          <li className={nav__item}>
            <Link href='#'>
              <a>Реклама</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={nav__flexContainer}>
        <ul className={nav__list}>
          <li className={nav__item}>
            <Link href='/user/profile'>
              <a>Профиль</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
