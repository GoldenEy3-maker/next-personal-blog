import type { ChildrenProps } from '../typescript/types'

import Head from 'next/head'

const AuthLayout = ({ children }: ChildrenProps) => {
  return (
    <>
      <Head>
        <title>Authorization</title>
      </Head>
      <div className='wrapper'>{children}</div>
    </>
  )
}

export default AuthLayout
