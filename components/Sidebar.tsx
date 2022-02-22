import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/modules/Sidebar.module.scss'

import SidebarBgPicture from '../public/images/Sidebar_bg_picture2.jpg'
import Avatar from '../public/images/avatar.jpg'
import Navigation from './Navigation'

import { useSidebarContext } from './context/sidebarContext'

import { setDynamicClasses, setStaticClasses } from '../helpers'
import { useWindowContext } from './context/globalWindowContext'

const Sidebar = () => {
  const { state, handleToggleState } = useSidebarContext()
  const isLaptopSize = useWindowContext()

  return (
    <>
      <div
        className={setDynamicClasses(
          styles.sidebar__mask,
          styles.__sidebarOpen,
          state
        )}
        onClick={handleToggleState}
      ></div>
      <aside
        className={setDynamicClasses(
          styles.sidebar,
          styles.__sidebarOpen,
          state
        )}
      >
        <div className={styles.sidebar__inner}>
          <div className={styles.__flexContainer}>
            <div className={styles.sidebar__picture}>
              <Image
                src={SidebarBgPicture}
                alt='profile-sidebar-bg'
                layout='responsive'
              />
            </div>
            <div className={styles.sidebar__profile}>
              <div className={styles.sidebarProfileAvatar}>
                <Link href=''>
                  <a>
                    <div className={styles.sidebarProfileAvatar__picture}>
                      <Image src={Avatar} alt='avatar' />
                    </div>
                    <div className={styles.sidebarProfileAvatar__info}>
                      <h2 className={styles.infoSidebarProfileAvatar__name}>
                        Дмитрий Валак
                      </h2>
                      <span className={styles.infoSidebarProfileAvatar__des}>
                        блог front-end разработчика
                      </span>
                    </div>
                  </a>
                </Link>
                <div className={styles.socialsSidebarProfileAvatar}>
                  <ul className={styles.socialsSidebarProfileAvatar__list}>
                    <li className={styles.socialsSidebarProfileAvatar__item}>
                      <a href='' target='_blank'>
                        <svg
                          width='25'
                          height='25'
                          viewBox='0 0 25 25'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clipPath='url(#clip0_11_403)'>
                            <path
                              d='M1.5625 1.70104C-0.402079 3.74166 4.11272e-06 5.90937 4.11272e-06 12.4948C4.11272e-06 17.9635 -0.954163 23.4458 4.03959 24.7365C5.59896 25.1375 19.4156 25.1375 20.9729 24.7344C23.0521 24.1979 24.7438 22.5115 24.975 19.5708C25.0073 19.1604 25.0073 5.83646 24.974 5.41771C24.7281 2.28541 22.8 0.480206 20.2594 0.114581C19.6771 0.0302058 19.5604 0.0052058 16.5729 -2.53692e-06C5.97605 0.0052058 3.65313 -0.466669 1.5625 1.70104Z'
                              fill='url(#paint0_linear_11_403)'
                            />
                            <path
                              d='M12.4979 3.2698C8.71563 3.2698 5.12397 2.93334 3.75209 6.45418C3.18543 7.90834 3.26772 9.79689 3.26772 12.5011C3.26772 14.874 3.19168 17.1042 3.75209 18.5469C5.12084 22.0698 8.74168 21.7323 12.4958 21.7323C16.1177 21.7323 19.8521 22.1094 21.2406 18.5469C21.8083 17.0781 21.725 15.2177 21.725 12.5011C21.725 8.8948 21.924 6.56668 20.175 4.81876C18.4042 3.04793 16.0094 3.2698 12.4938 3.2698H12.4979ZM11.6708 4.93334C19.5604 4.92084 20.5646 4.04376 20.0104 16.2281C19.8135 20.5375 16.5323 20.0646 12.499 20.0646C5.1448 20.0646 4.93334 19.8542 4.93334 12.4969C4.93334 5.05418 5.51668 4.93751 11.6708 4.93126V4.93334ZM17.425 6.46564C16.8135 6.46564 16.3177 6.96147 16.3177 7.57293C16.3177 8.18439 16.8135 8.68022 17.425 8.68022C18.0365 8.68022 18.5323 8.18439 18.5323 7.57293C18.5323 6.96147 18.0365 6.46564 17.425 6.46564ZM12.4979 7.76043C9.88022 7.76043 7.75834 9.88335 7.75834 12.5011C7.75834 15.1188 9.88022 17.2406 12.4979 17.2406C15.1156 17.2406 17.2365 15.1188 17.2365 12.5011C17.2365 9.88335 15.1156 7.76043 12.4979 7.76043ZM12.4979 9.42397C16.5656 9.42397 16.5708 15.5781 12.4979 15.5781C8.43126 15.5781 8.42501 9.42397 12.4979 9.42397Z'
                              fill='white'
                            />
                          </g>
                          <defs>
                            <linearGradient
                              id='paint0_linear_11_403'
                              x1='1.61044'
                              y1='23.4032'
                              x2='24.8453'
                              y2='3.29372'
                              gradientUnits='userSpaceOnUse'
                            >
                              <stop stopColor='#8E7F42' />
                              <stop offset='0.5' stopColor='#FF543E' />
                              <stop offset='1' stopColor='#C837AB' />
                            </linearGradient>
                            <clipPath id='clip0_11_403'>
                              <rect width='25' height='25' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </li>
                    <li className={styles.socialsSidebarProfileAvatar__item}>
                      <a href='' target='_blank'>
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
                    <li className={styles.socialsSidebarProfileAvatar__item}>
                      <a href='' target='_blank'>
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
                              <rect width='25' height='25' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.sidebarProfileDescription}>
                <p className={styles.sidebarProfileDescription__text}>
                  Front-end разработчик. Практик верстки сайтов. Созданием
                  сайтов занимаюсь с 2012 года. Работал в нескольких ИТ
                  компаниях и наработал более 10 000 часов в создании сайтов
                  различной сложности.
                </p>
                {isLaptopSize && <Navigation />}
              </div>
            </div>
          </div>
          <div className={styles.sidebar__controls}>
            <Link href=''>
              <a>
                <button
                  className={setStaticClasses([
                    styles.sidebarControls__button,
                    styles.sidebarControls__button__red,
                  ])}
                >
                  Мои работы
                </button>
              </a>
            </Link>
            <button
              className={setStaticClasses([
                styles.sidebarControls__button,
                styles.sidebarControls__button__blue,
              ])}
            >
              Написать мне
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
