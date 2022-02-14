import { ReactNode, useState } from 'react'
import Head from 'next/head'

import Header from './Header'
import Sidebar from './Sidebar'

type TMainLayoutProps = {
  children: ReactNode
}

const MainLayout = ({ children }: TMainLayoutProps) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  const handleSidebarState = () => {
    setSidebarIsOpen((prev) => (prev === true ? false : true))
  }

  return (
    <>
      <Head>
        <title>Personal blog</title>
      </Head>

      <div className='wrapper'>
        <Sidebar
          sidebarIsOpen={sidebarIsOpen}
          handleSidebarState={handleSidebarState}
        />
        <Header
          handleSidebarState={handleSidebarState}
          sidebarIsOpen={sidebarIsOpen}
        />
        <main className='page-content'>{children}</main>
      </div>
    </>
  )
}

export default MainLayout
