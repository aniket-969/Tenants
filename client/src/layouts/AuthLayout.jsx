import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex items-center justify-center flex-col gap-4 h-screen'>
        <Outlet/>
    </div>
  )
}

export default AuthLayout