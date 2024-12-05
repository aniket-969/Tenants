import React from 'react'
import { Outlet } from 'react-router-dom'

export const RoomLayout = ({children}) => {
  return (

    <>
    <Outlet/>
    </>
  )
}
