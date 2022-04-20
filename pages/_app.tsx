import type {AppProps} from 'next/app'

import {SearchContextProvider} from '../context/search.context'
import {SidebarContextProvider} from '../context/sidebar.context'
import {WindowContextProvider} from '../context/window.context'
import {PopupContextProvider} from "../context/popup.context";

import '../styles/globals.scss'

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <WindowContextProvider>
      <SidebarContextProvider>
        <SearchContextProvider>
          <PopupContextProvider>
            <Component {...pageProps} />
          </PopupContextProvider>
        </SearchContextProvider>
      </SidebarContextProvider>
    </WindowContextProvider>
  )
}

export default MyApp
