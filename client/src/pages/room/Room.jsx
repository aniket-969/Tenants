import ProfileCard from '@/components/profileCard'
import QRCode from '@/components/QRCode'
import { RoomHeader } from '@/components/roomHeader'
import RoomList from '@/components/roomList'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Room = () => {
  return (
    <div>
      <RoomHeader/>
      <ProfileCard/>
      <RoomList/>
      <QRCode/>
    </div>
  )
}

export default Room