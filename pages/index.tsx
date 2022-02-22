import type { NextPage } from 'next'

import MainLayout from '../components/MainLayout'
import Stories from '../components/Stories'

const Home: NextPage = () => {
  return (
    <MainLayout>
      <div className='home __container'>
        <Stories />
      </div>
    </MainLayout>
  )
}

export default Home
