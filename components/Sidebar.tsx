import Image from 'next/image'
import Link from 'next/link'

import Navigation from './Navigation'
import {useRouter} from "next/router";

import {useSidebarContext} from '../context/sidebar.context'
import {useWindowContext} from '../context/window.context'

import {setDynamicClasses, setStaticClasses} from '../lib/functions'

import styles from '../styles/modules/Sidebar.module.scss'

import Avatar from '../public/images/avatar.jpg'
import SidebarBgPicture from '../public/images/Sidebar_bg_picture2.jpg'
import {RoutePaths} from "../typescript/enums";
import {MouseEventHandler} from "react";
import {usePopupContext} from "../context/popup.context";

const {
  sidebar,
  sidebar__mask,
  _sidebarOpen,
  sidebar__inner,
  sidebarPicture,
  sidebarProfile,
  sidebarProfile__inner,
  sidebarProfile__avatar,
  sidebarProfile__description,
  sidebarProfile__name,
  sidebarProfile__status,
  sidebarProfileSocials,
  sidebarProfileSocials__list,
  sidebarProfileSocials__item,
  sidebarDescription,
  sidebarDescription__text,
  sidebarControls,
  sidebarControls__inner,
  sidebarControls__button,
  sidebarControls__button__red,
  sidebarControls__button__blue,
} = styles

const Sidebar = () => {
  const router = useRouter()

  const {openPopup} = usePopupContext()
  const {isSidebarActive, toggleSidebarState} = useSidebarContext()
  const isWindowInLaptopSize = useWindowContext()

  const clickButtonLinkHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (router.route === RoutePaths.WorksPage) {
      event.preventDefault()
    }

    toggleSidebarState()
  }

  return (
    <>
      <div
        className={setDynamicClasses({
          staticClasses: [sidebar__mask],
          dynamicClasses: [[_sidebarOpen]],
          conditions: [isSidebarActive],
        })}
        onClick={toggleSidebarState}
      />
      <aside
        className={setDynamicClasses({
          staticClasses: [sidebar],
          dynamicClasses: [[_sidebarOpen]],
          conditions: [isSidebarActive],
        })}
      >
        <div className={sidebar__inner}>
          <div className={sidebarPicture}>
            <Image
              src={SidebarBgPicture}
              alt='profile-sidebar-bg'
              layout='responsive'
              priority
            />
          </div>
          <div className={sidebarProfile}>
            <div className={sidebarProfile__inner}>
              <div className={sidebarProfile__avatar}>
                <Image src={Avatar} alt='avatar'/>
              </div>
              <div className={sidebarProfile__description}>
                <div className={sidebarProfile__name}>Дмитрий Валак</div>
                <div className={sidebarProfile__status}>
                  блог front-end разработчика
                </div>
              </div>
              <div className={sidebarProfileSocials}>
                <ul className={sidebarProfileSocials__list}>
                  <li className={sidebarProfileSocials__item}>
                    <a href='#' target='_blank'>
                      <svg enableBackground="new 0 0 512 512" id="Layer_1" version="1.1" viewBox="0 0 512 512"
                           xmlns="http://www.w3.org/2000/svg">
                        <circle cx="256" cy="256" fill="#0088CC" id="ellipse" r="256"/>
                        <path
                          d="M246.4,332.1c-12.3,11.9-24.4,23.7-36.5,35.5c-4.2,4.1-8.9,6.4-15,6.1c-4.1-0.2-6.4-2-7.7-5.9  c-9.2-28.6-18.6-57.2-27.8-85.9c-0.9-2.8-2.2-4.1-5-5c-21.7-6.6-43.5-13.4-65.1-20.3c-3.3-1.1-6.7-2.4-9.6-4.4  c-4.5-3-5.1-7.9-1.1-11.5c3.7-3.3,8.1-6.1,12.7-7.9c26.6-10.5,53.3-20.7,80-31c67.7-26.1,135.4-52.3,203.1-78.4  c12.9-5,22.8,2,21.4,16c-0.9,8.9-3.2,17.7-5,26.5c-14.7,69.4-29.4,138.9-44.2,208.3c-3.5,16.5-15.1,20.8-28.6,10.8  c-22.7-16.7-45.4-33.5-68.1-50.3C248.8,333.8,247.7,333,246.4,332.1z M195.4,353.2c0.3-0.1,0.5-0.1,0.8-0.2c0.1-0.7,0.3-1.3,0.4-1.9  c1.5-15.7,3-31.5,4.3-47.2c0.3-3.5,1.5-6,4.1-8.4c20.9-18.7,41.8-37.6,62.6-56.4c23.1-20.8,46.2-41.6,69.2-62.5c1.4-1.3,2-3.5,3-5.3  c-2.2-0.2-4.5-1.1-6.5-0.6c-2.7,0.7-5.2,2.3-7.6,3.8c-50.9,32.1-101.9,64.2-152.8,96.3c-2.9,1.8-3.4,3.3-2.3,6.5  c3.8,10.8,7.2,21.7,10.7,32.6C186,324.3,190.7,338.8,195.4,353.2z"
                          fill="#FFFFFF" id="logo"/>
                      </svg>
                    </a>
                  </li>
                  <li className={sidebarProfileSocials__item}>
                    <a href='#' target='_blank'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25Z'
                          fill='#4D76A1'
                        />
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M12.0278 17.9824H13.0089C13.0089 17.9824 13.3053 17.9498 13.4566 17.7867C13.5959 17.637 13.5914 17.3558 13.5914 17.3558C13.5914 17.3558 13.5722 16.0393 14.1832 15.8455C14.7855 15.6545 15.5589 17.1178 16.3787 17.6804C16.9986 18.1062 17.4697 18.0129 17.4697 18.0129L19.6616 17.9824C19.6616 17.9824 20.8082 17.9117 20.2645 17.0102C20.22 16.9364 19.9479 16.3433 18.6348 15.1244C17.2604 13.8487 17.4445 14.0551 19.1001 11.8484C20.1084 10.5046 20.5114 9.68416 20.3855 9.33276C20.2654 8.99808 19.5239 9.08654 19.5239 9.08654L17.0559 9.10192C17.0559 9.10192 16.8729 9.07696 16.7372 9.15807C16.6047 9.23762 16.5193 9.42301 16.5193 9.42301C16.5193 9.42301 16.1287 10.4629 15.6077 11.3473C14.5088 13.2135 14.0694 13.312 13.8898 13.1961C13.472 12.926 13.5763 12.1112 13.5763 11.5323C13.5763 9.72382 13.8505 8.96978 13.0421 8.77459C12.7739 8.70975 12.5764 8.66696 11.8904 8.66006C11.0098 8.65092 10.2644 8.66273 9.84239 8.86951C9.56163 9.00699 9.34504 9.31338 9.47695 9.33098C9.64006 9.35282 10.0095 9.43058 10.2054 9.6973C10.4583 10.0413 10.4494 10.8141 10.4494 10.8141C10.4494 10.8141 10.5946 12.943 10.11 13.2075C9.77732 13.3888 9.32098 13.0185 8.34122 11.3255C7.83919 10.4582 7.46017 9.49966 7.46017 9.49966C7.46017 9.49966 7.38708 9.32051 7.25673 9.22469C7.09853 9.1086 6.87748 9.07161 6.87748 9.07161L4.53226 9.08699C4.53226 9.08699 4.1802 9.09679 4.05096 9.24987C3.93598 9.38602 4.04182 9.66767 4.04182 9.66767C4.04182 9.66767 5.87789 13.9633 7.95685 16.128C9.86311 18.1127 12.0278 17.9824 12.0278 17.9824Z'
                          fill='white'
                        />
                      </svg>
                    </a>
                  </li>
                  <li className={sidebarProfileSocials__item}>
                    <a href='#' target='_blank'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <g clipPath='url(#clip0_8_49)'>
                          <path
                            d='M12.5 25C19.4035 25 24.9998 19.4037 24.9998 12.5002C24.9998 5.59678 19.4035 0.000442505 12.5 0.000442505C5.59659 0.000442505 0.000244141 5.59678 0.000244141 12.5002C0.000244141 19.4037 5.59659 25 12.5 25Z'
                            fill='#CB2027'
                          />
                          <path
                            d='M13.509 16.7387C12.564 16.6656 12.1669 16.197 11.4258 15.7472C11.0185 17.8842 10.5207 19.9329 9.04631 21.0031C8.59064 17.7731 9.71432 15.347 10.2362 12.7718C9.34667 11.2745 10.3431 8.26063 12.2193 9.00329C14.5284 9.9164 10.2201 14.5709 13.1123 15.1522C16.1318 15.7592 17.3644 9.91306 15.4918 8.01151C12.7863 5.26614 7.61669 7.94912 8.2524 11.8792C8.40726 12.84 9.40015 13.1317 8.64902 14.4575C6.91748 14.074 6.40098 12.7083 6.46738 10.8877C6.57456 7.90745 9.14524 5.82074 11.7237 5.53197C14.9847 5.16699 18.0454 6.7294 18.4678 9.79675C18.9431 13.2587 16.9956 17.0079 13.509 16.7387Z'
                            fill='#F1F2F2'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_8_49'>
                            <rect width='25' height='25' fill='white'/>
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={sidebarDescription}>
              <p className={sidebarDescription__text}>
                Front-end разработчик. Практик верстки сайтов. Созданием сайтов
                занимаюсь с 2012 года. Работал в нескольких ИТ компаниях и
                наработал более 10 000 часов в создании сайтов различной
                сложности.
              </p>
              {isWindowInLaptopSize && <Navigation/>}
            </div>
          </div>
          <div className={sidebarControls}>
            <div className={sidebarControls__inner}>
              <Link href={RoutePaths.WorksPage}>
                <a onClick={clickButtonLinkHandler}>
                  <button
                    className={setStaticClasses([
                      sidebarControls__button,
                      sidebarControls__button__red,
                    ])}
                  >
                    Мои работы
                  </button>
                </a>
              </Link>
              <button
                className={setStaticClasses([
                  sidebarControls__button,
                  sidebarControls__button__blue,
                ])}
                onClick={() => openPopup('contactPopup')}
              >
                Написать мне
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
