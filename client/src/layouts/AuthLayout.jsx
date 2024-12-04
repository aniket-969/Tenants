import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex flex-col items-center h-screen justify-center '>
        <Outlet/>
    </div>
  )
}

export default AuthLayout