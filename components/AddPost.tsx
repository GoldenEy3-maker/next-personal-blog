import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import { setDynamicClasses } from '../lib/functions'

import styles from '../styles/modules/AddPost.module.scss'

const {
  addPost,
  addPost__inner,
  addPostForm,
  addPostForm__textarea,
  addPostFormControls,
  addPostFormControls__list,
  addPostFormControls__item,
  _focusTextarea,
  _typingTextarea,
} = styles

const AddPost = () => {
  const [isFocus, setIsFocus] = useState(false)
  const [textareaValue, setTextareaValue] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const defaultTextareaHeightRef = useRef(0)

  const focusHandlerTextarea = () => {
    setIsFocus(true)
  }

  const blurHandlerTextarea = () => {
    if (textareaValue === '') {
      setIsFocus(false)
    }
  }

  const changeTextareaValueHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    event.target.style.height = 'auto'

    if (event.target.scrollHeight > defaultTextareaHeightRef.current) {
      event.target.style.height = event.target.scrollHeight + 'px'
    } else {
      event.target.style.height = defaultTextareaHeightRef.current + 'px'
    }

    setTextareaValue(event.target.value)
  }

  const submitFormHandler: FormEventHandler = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (textareaRef.current) {
      defaultTextareaHeightRef.current = textareaRef.current.offsetHeight
    }
  }, [])

  return (
    <div className={addPost}>
      <div className={addPost__inner}>
        <form
          className={setDynamicClasses({
            staticClasses: [addPostForm],
            dynamicClasses: [[_focusTextarea], [_typingTextarea]],
            conditions: [isFocus, textareaValue !== ''],
          })}
          onSubmit={submitFormHandler}
        >
          <div className={addPostForm__textarea}>
            <textarea
              name='post-content'
              id='post-content'
              ref={textareaRef}
              value={textareaValue}
              onFocus={focusHandlerTextarea}
              onBlur={blurHandlerTextarea}
              onChange={changeTextareaValueHandler}
            ></textarea>
            <span>Напишите что-нибудь</span>
          </div>
          <div className={addPostFormControls}>
            <ul className={addPostFormControls__list}>
              <li className={addPostFormControls__item}>
                <label htmlFor='attach-post-file'>
                  <svg
                    width='30'
                    height='27'
                    viewBox='0 0 30 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M17.6513 11.7368C19.1158 13.2431 19.1158 15.6853 17.6513 17.1916C16.1868 18.6979 13.8124 18.6979 12.3479 17.1916C10.8834 15.6853 10.8834 13.2431 12.3479 11.7368C13.8124 10.2305 16.1868 10.2305 17.6513 11.7368'
                      fill='#989898'
                    />
                    <path
                      d='M26.2499 3.85715H23.6588L21.7829 0H8.21527L6.3411 3.85905L3.75375 3.86378C1.69102 3.86758 0.0118537 5.5965 0.0100726 7.71904L0 23.1419C0 25.2692 1.68187 27 3.75012 27H26.2499C28.3181 27 30 25.2701 30 23.1428V7.71424C29.9999 5.58702 28.3181 3.85715 26.2499 3.85715V3.85715ZM14.9995 22.1785C10.8639 22.1785 7.49926 18.7179 7.49926 14.4642C7.49926 10.2106 10.8639 6.74994 14.9995 6.74994C19.1351 6.74994 22.4998 10.2106 22.4998 14.4642C22.4998 18.7179 19.1351 22.1785 14.9995 22.1785V22.1785Z'
                      fill='#989898'
                    />
                  </svg>
                </label>
                <input
                  type='file'
                  name='attach-post-file'
                  id='attach-post-file'
                />
              </li>
              <li className={addPostFormControls__item}>
                <button type='submit'>
                  <svg
                    width='20'
                    height='23'
                    viewBox='0 0 20 23'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M18.9103 10.3024L0.979749 0.0768307C0.694238 -0.08337 0.353557 0.0120688 0.154941 0.315428C-0.0450539 0.618786 -0.0519503 1.04996 0.13839 1.36184L6.0348 11.0761L0.13839 20.7904C-0.0519503 21.1023 -0.0450539 21.5352 0.153562 21.8369C0.287352 22.0431 0.487347 22.1538 0.6901 22.1538C0.788029 22.1538 0.885958 22.1283 0.978369 22.0755L18.909 11.8499C19.1545 11.7101 19.3103 11.4085 19.3103 11.0761C19.3103 10.7438 19.1545 10.4422 18.9103 10.3024Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPost
