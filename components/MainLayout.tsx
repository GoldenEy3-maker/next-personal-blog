import type {ChildrenProps} from '../typescript/types'

import Head from 'next/head'

import Header from './Header'
import Sidebar from './Sidebar'
import ContactPopup from "./ContactPopup";
import SharePopup from "./SharePopup";

const MainLayout = ({children}: ChildrenProps) => {
  return (
    <>
      <Head>
        <title>Personal blog</title>
      </Head>
      <div className='wrapper'>
        <ContactPopup/>
        <SharePopup/>
        <Sidebar/>
        <Header/>
        <main className='page-content'>
          <div className='page-content__inner _container'>{children}</div>
        </main>
      </div>
    </>
  )
}

export default MainLayout
