import { useRoom, useRoomMutation } from '@/hooks/useRoom'
import { useParams } from 'react-router-dom'

const RoomDetails = () => {
  const{roomId} = useParams()
const {roomQuery} = useRoom(roomId)
const{data,loading,error} = roomQuery

  return (
    <div>RoomDetails</div>
  )
}

export default RoomDetails