import { getSocket } from '@/socket'
import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

export const RoomLayout = ({children}) => {
  
const socket = getSocket()
const { roomId } = useParams();

useEffect(() => {
  if (roomId) {
    socket.emit("joinRoom", roomId); // Join the room
    console.log(`Joined room: ${roomId}`);

    return () => {
      socket.emit("leaveRoom", roomId); // Leave the room on unmount
      console.log(`Left room: ${roomId}`);
    };
  }
}, [roomId, socket]);
  return (
    <>
    <Outlet/>
    </>
  )
}
