import type {MouseEventHandler, TouchEventHandler} from 'react'

import Image from 'next/image'
import {useState, useCallback, useRef} from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'

import {setCurrentDatetime} from '../lib/functions'

// import 'swiper/css'
import styles from '../styles/modules/Stories.module.scss'

import Stories1 from '../public/images/stories1.jpg'
import Stories2 from '../public/images/stories2.jpg'
import Stories3 from '../public/images/stories3.jpg'
import Stories4 from '../public/images/stories4.jpg'

const {
  stories,
  stories__inner,
  stories__list,
  storiesItem,
  storiesItem__preview,
  storiesItem__text,
  storiesItem__date,
} = styles

const Stories = () => {
  const [isListDragging, setIsListDragging] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)

  const startXRef = useRef(0)
  const currentOffsetXRef = useRef(0)

  const slideGap = 25
  const slideWidth = 280 + slideGap
  const positionThreshold = slideWidth * 0.35
  const listLenght = 10
  const slidersPerView = 4
  const currentListLenght = listLenght - slidersPerView


  const swipeMouseAction = useCallback((event: MouseEvent) => {
    const diff = startXRef.current - event.clientX
    const newOffsetX = currentOffsetXRef.current - diff

    setOffsetX(newOffsetX)
  }, [])


  const swipeMouseEnd = useCallback((event: MouseEvent) => {
    setIsListDragging(false)

    const diff = startXRef.current - event.clientX
    const newOffsetX = currentOffsetXRef.current - diff

    let newSlideIndex = Math.round(-newOffsetX / slideWidth)

    if (newSlideIndex > currentListLenght) newSlideIndex = currentListLenght
    if (newSlideIndex < 0) newSlideIndex = 0

    setSlideIndex(newSlideIndex)

    setOffsetX(-(newSlideIndex * slideWidth))

    document.removeEventListener('mousemove', swipeMouseAction)
    document.removeEventListener('mouseup', swipeMouseEnd)
  }, [currentListLenght, slideWidth, swipeMouseAction])

  const swipeMouseStart: MouseEventHandler = (event) => {
    setIsListDragging(true)

    currentOffsetXRef.current = offsetX
    startXRef.current = event.clientX

    document.addEventListener('mousemove', swipeMouseAction)
    document.addEventListener('mouseup', swipeMouseEnd)
  }

  const swipeTouchAction = (event: TouchEvent) => {
    const diff = startXRef.current - event.touches[0].clientX
    const newOffsetX = currentOffsetXRef.current - diff

    setOffsetX(newOffsetX)
  }

  const swipeTouchEnd = (event: TouchEvent) => {
    document.removeEventListener('touchmove', swipeTouchAction)
    document.removeEventListener('touchend', swipeTouchEnd)
  }

  const swipeTouchStart: TouchEventHandler = (event) => {
    currentOffsetXRef.current = offsetX
    startXRef.current = event.touches[0].clientX

    document.addEventListener('touchmove', swipeTouchAction)
    document.addEventListener('touchend', swipeTouchEnd)
  }

  const nextSlide: MouseEventHandler = (event) => {
    setOffsetX(-(slideIndex + 1) * slideWidth)

    setSlideIndex(index => ++index)
  }

  const prevSlide: MouseEventHandler<HTMLButtonElement> = (event) => {

    setOffsetX(-(slideIndex - 1) * slideWidth)

    setSlideIndex(index => --index)
  }


  return (
    <div className={stories}>
      <div className={stories__inner}
           onMouseDown={swipeMouseStart}
           onTouchStart={swipeTouchStart}
      >
        <ul
          className={stories__list}
          style={{
            transform: `translateX(${offsetX}px)`,
            transitionDuration: !isListDragging ? '400ms' : '0ms',
          }}
        >
          <li className={storiesItem}>
            <div className={storiesItem__preview}>
              <Image
                src={Stories2}
                alt='storie preview picture'
                layout='responsive'
                priority
                draggable={false}
              />
            </div>
            <div className={storiesItem__text}>Заканчиваю сложный проект</div>
            <div className={storiesItem__date}>
              <time dateTime={setCurrentDatetime('15.09.2020')}>
                15.09.2020
              </time>
            </div>
          </li>
          <li className={storiesItem}>
            <div className={storiesItem__preview}>
              <Image
                src={Stories2}
                alt='storie preview picture'
                layout='responsive'
                priority
                draggable={false}
              />
            </div>
            <div className={storiesItem__text}>Заканчиваю сложный проект</div>
            <div className={storiesItem__date}>
              <time dateTime={setCurrentDatetime('15.09.2020')}>
                15.09.2020
              </time>
            </div>
          </li>
          <li className={storiesItem}>
            <div className={storiesItem__preview}>
              <Image
                src={Stories2}
                alt='storie preview picture'
                layout='responsive'
                priority
                draggable={false}
              />
            </div>
            <div className={storiesItem__text}>Заканчиваю сложный проект</div>
            <div className={storiesItem__date}>
              <time dateTime={setCurrentDatetime('15.09.2020')}>
                15.09.2020
              </time>
            </div>
          </li>
          <li className={storiesItem}>
            <div className={storiesItem__preview}>
              <Image
                src={Stories2}
                alt='storie preview picture'
                layout='responsive'
                priority
                draggable={false}
              />
            </div>
            <div className={storiesItem__text}>Заканчиваю сложный проект</div>
            <div className={storiesItem__date}>
              <time dateTime={setCurrentDatetime('15.09.2020')}>
                15.09.2020
              </time>
            </div>
          </li>
          <li className={storiesItem}>
            <div className={storiesItem__preview}>
              <Image
                src={Stories2}
                alt='storie preview picture'
                layout='responsive'
                priority
                draggable={false}
              />
            </div>
            <div className={storiesItem__text}>Заканчиваю сложный проект</div>
            <div className={storiesItem__date}>
              <time dateTime={setCurrentDatetime('15.09.2020')}>
                15.09.2020
              </time>
            </div>
          </li>
          <li className={storiesItem}>
            <div className={storiesItem__preview}>
              <Image
                src={Stories2}
                alt='storie preview picture'
                layout='responsive'
                priority
                draggable={false}
              />
            </div>
            <div className={storiesItem__text}>Заканчиваю сложный проект</div>
            <div className={storiesItem__date}>
              <time dateTime={setCurrentDatetime('15.09.2020')}>
                15.09.2020
              </time>
            </div>
          </li>
          <li className={storiesItem}>
            <div className={storiesItem__preview}>
              <Image
                src={Stories2}
                alt='storie preview picture'
                layout='responsive'
                priority
                draggable={false}
              />
            </div>
            <div className={storiesItem__text}>Заканчиваю сложный проект</div>
            <div className={storiesItem__date}>
              <time dateTime={setCurrentDatetime('15.09.2020')}>
                15.09.2020
              </time>
            </div>
          </li>
          <li className={storiesItem}>
            <div className={storiesItem__preview}>
              <Image
                src={Stories3}
                alt='storie preview picture'
                layout='responsive'
                priority
                draggable={false}
              />
            </div>
            <div className={storiesItem__text}>Переехал в новую квартиру</div>
            <div className={storiesItem__date}>
              <time dateTime={setCurrentDatetime('11.09.2020')}>
                11.09.2020
              </time>
            </div>
          </li>
          <li className={storiesItem}>
            <div className={storiesItem__preview}>
              <Image
                src={Stories4}
                alt='storie preview picture'
                layout='responsive'
                priority
                draggable={false}
              />
            </div>
            <div className={storiesItem__text}>Осень пришла!</div>
            <div className={storiesItem__date}>
              <time dateTime={setCurrentDatetime('28.08.2020')}>
                28.08.2020
              </time>
            </div>
          </li>
          <li className={storiesItem}>
            <div className={storiesItem__preview}>
              <Image
                src={Stories4}
                alt='storie preview picture'
                layout='responsive'
                priority
                draggable={false}
              />
            </div>
            <div className={storiesItem__text}>Осень пришла!</div>
            <div className={storiesItem__date}>
              <time dateTime={setCurrentDatetime('28.08.2020')}>
                28.08.2020
              </time>
            </div>
          </li>
        </ul>
        <div className="stories__control">
          <button type={'button'} onClick={prevSlide} disabled={slideIndex <= 0}>Назад</button>
          <button type={'button'} onClick={nextSlide} disabled={slideIndex >= currentListLenght}>Вперед</button>
        </div>
      </div>
    </div>
  )
}

export default Stories
