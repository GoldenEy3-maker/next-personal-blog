import type {ChangeEventHandler} from "react";

import Link from 'next/link'

import {useState} from 'react'

import PopupLayout from "./PopupLayout";
import FormInput from "./FormInput";

import styles from '../styles/modules/Popup.module.scss'

const {
  contactPopupForm,
  contactPopupForm__list,
  contactPopupForm__item,
  contactPopupForm__sendBtn,
  contactPopupInfo,
  contactPopupInfo__list,
  contactPopupInfo__item
} = styles

const ContactPopup = () => {
  const [contactPopupFormValues, setContactPopupFormValues] = useState({
    contactName: '',
    contactEmail: '',
    contactText: ''
  })

  const changeContactPopupFormValuesHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setContactPopupFormValues(values => ({...values, [event.target.name]: event.target.value}))
  }

  return (
    <PopupLayout name='contactPopup'>
      <form className={contactPopupForm}>
        <ul className={contactPopupForm__list}>
          <li className={contactPopupForm__item}>
            <FormInput type='text' value={contactPopupFormValues.contactName} name='contactName'
                       changeHandler={changeContactPopupFormValuesHandler} placeholder='Ваше имя'/>
          </li>
          <li className={contactPopupForm__item}>
            <FormInput type='email' value={contactPopupFormValues.contactEmail} name='contactEmail'
                       changeHandler={changeContactPopupFormValuesHandler} placeholder='Ваш email'/>
          </li>
          <li className={contactPopupForm__item}>
            <FormInput type='text' value={contactPopupFormValues.contactText} name='contactText'
                       changeHandler={changeContactPopupFormValuesHandler} placeholder='Текст сообщения'/>
          </li>
        </ul>
        <div className={contactPopupForm__sendBtn}>
          <button type='submit'>Отправить</button>
        </div>
      </form>
      <div className={contactPopupInfo}>
        <ul className={contactPopupInfo__list}>
          <li className={contactPopupInfo__item}>
            <span>email:</span>
            <Link href={'mailto:info@mywebsite.ru'}>
              <a>info@mywebsite.ru</a>
            </Link>
          </li>
          <li className={contactPopupInfo__item}>
            <span>email:</span>
            <Link href={'tel:+943-232-856-22'}>
              <a>+943-232-856-22</a>
            </Link>
          </li>
        </ul>
      </div>
    </PopupLayout>
  )
}

export default ContactPopup