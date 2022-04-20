import type {MouseEvent, MouseEventHandler} from 'react'
import {RoutePaths} from '../typescript/enums'

import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'

import {useWindowContext} from '../context/window.context'
import {useSearchContext} from '../context/search.context'

import {setDynamicClasses} from '../lib/functions'

import styles from '../styles/modules/Navigation.module.scss'
import {useRouter} from "next/router";
import {useSidebarContext} from "../context/sidebar.context";

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

  const router = useRouter()

  const {toggleSidebarState} = useSidebarContext()
  const {setSearchValueByTagContent} = useSearchContext()
  const isWindowInLaptopSize = useWindowContext()

  const refSubmenu = useRef<HTMLDivElement>(null)

  const toggleSubmenu = () => {
    setSubmenuState((state) => ({...state, isActive: !state.isActive}))
  }

  const handleActiveSubmenuHeight = () => {
    if (isWindowInLaptopSize) {
      return {
        height: submenuState.isActive ? `${submenuState.height}px` : 0,
      }
    }

    return {}
  }

  const cancelDefaultClickLink: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()
  }

  const clickSubmenuLinkHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (router.route === RoutePaths.SearchPage) {
      cancelDefaultClickLink(event)
    }

    toggleSidebarState()

    setSearchValueByTagContent(event)
  }

  const clickNavLinkHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    const hrefLinkPath = event.currentTarget.getAttribute('href')

    if (router.route === hrefLinkPath) {
      cancelDefaultClickLink(event)
    }

    toggleSidebarState()
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
              <a onClick={clickNavLinkHandler}>Главная</a>
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
            <Link href={RoutePaths.HomePage}>
              <a onClick={cancelDefaultClickLink}>
                Статьи
                <span className={nav__item_icon}>
                  <svg
                    width='14'
                    height='9'
                    viewBox='0 0 10 5'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M5 5L0.669872 0.5L9.33013 0.5L5 5Z' fill='white'/>
                  </svg>
                </span>
              </a>
            </Link>

            <div
              ref={refSubmenu}
              className={navSubmenu}
              style={handleActiveSubmenuHeight()}
            >
              <ul
                className={navSubmenu__list}
                onClick={(event: MouseEvent<HTMLUListElement>) =>
                  event.stopPropagation()
                }
              >
                <li className={navSubmenu__item}>
                  <Link href={RoutePaths.SearchPage}>
                    <a onClick={clickSubmenuLinkHandler}>Создание сайтов</a>
                  </Link>
                </li>
                <li className={navSubmenu__item}>
                  <Link href={RoutePaths.SearchPage}>
                    <a onClick={clickSubmenuLinkHandler}>
                      Интернет-маркетинг
                    </a>
                  </Link>
                </li>
                <li className={navSubmenu__item}>
                  <Link href={RoutePaths.SearchPage}>
                    <a onClick={clickSubmenuLinkHandler}>
                      Продвижение видео
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={nav__item}>
            <Link href={RoutePaths.HomePage}>
              <a onClick={clickNavLinkHandler}>Обо мне</a>
            </Link>
          </li>
          <li className={nav__item}>
            <Link href={RoutePaths.HomePage}>
              <a onClick={clickNavLinkHandler}>Реклама</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={nav__flexContainer}>
        <ul className={nav__list}>
          <li className={nav__item}>
            {router.route === RoutePaths.ProfilePage ? <Link href='/api/auth/logout'>
              <a onClick={clickNavLinkHandler}>Выход</a>
            </Link> : <Link href={RoutePaths.ProfilePage}>
              <a onClick={clickNavLinkHandler}>Профиль</a>
            </Link>}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
