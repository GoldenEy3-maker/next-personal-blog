import type { ChildrenProps } from '../typescript/types'

import Head from 'next/head'

import Header from './Header'
import Sidebar from './Sidebar'

import { SidebarContextProvider } from '../context/sidebar.context'
import { WindowContextProvider } from '../context/window.context'

const MainLayout = ({ children }: ChildrenProps) => {
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
