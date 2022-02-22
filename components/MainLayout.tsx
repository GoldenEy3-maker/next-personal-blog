import Head from 'next/head'

import Header from './Header'
import Sidebar from './Sidebar'

import { SidebarContextProvider } from './context/sidebarContext'
import { WindowContextProvider } from './context/globalWindowContext'

import { TChildrenProps } from '../types'

const MainLayout = ({ children }: TChildrenProps) => {
  return (
    <>
      <Head>
        <title>Personal blog</title>
      </Head>

      <div className='wrapper'>
        <WindowContextProvider>
          <SidebarContextProvider>
            <Sidebar />
            <Header />
          </SidebarContextProvider>
        </WindowContextProvider>
        <main className='page-content'>{children}</main>
      </div>
    </>
  )
}

export default MainLayout
