import type { ResponseMessageComponent } from '../typescript/interfaces'
import { ResponseMessageType } from '../typescript/enums'

import { setDynamicClasses } from '../lib/functions'

import styles from '../styles/modules/ResponseMessage.module.scss'
import { useEffect } from 'react'

const {
  responseMessage,
  responseMessage__inner,
  responseMessage__text,
  _successMessage,
  _warningMessage,
  _dangerMessage,
  _hideMessage,
} = styles

const ResponseMessage: ResponseMessageComponent = ({
  message,
  type,
  isHideMessage,
  closeResponseMessage,
}) => {
  return (
    <div
      className={setDynamicClasses({
        staticClasses: [responseMessage],
        dynamicClasses: [
          [_hideMessage],
          [_successMessage],
          [_warningMessage],
          [_dangerMessage],
        ],
        conditions: [
          isHideMessage,
          type !== undefined && type === ResponseMessageType.Success,
          type !== undefined && type === ResponseMessageType.Warning,
          type !== undefined && type === ResponseMessageType.Danger,
        ],
      })}
    >
      <div
        className={responseMessage__inner}
        onClick={() => closeResponseMessage()}
      >
        <div className={responseMessage__text}>
          {message !== undefined && message}
        </div>
      </div>
    </div>
  )
}

export default ResponseMessage
