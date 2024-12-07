import ProfileCard from '@/components/profileCard'
import QRCode from '@/components/QRCode'
import { RoomHeader } from '@/components/roomHeader'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Room = () => {
  return (
    <div>
      <RoomHeader/>
      <ProfileCard/>
      <QRCode/>
    </div>
  )
}

export default Room