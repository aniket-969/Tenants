import { useRoom, useRoomMutation } from '@/hooks/useRoom'
import { useParams } from 'react-router-dom'

const RoomDetails = () => {
  const{roomId} = useParams()
const {roomQuery} = useRoom()
const{data,loading,error} = roomQuery

  return (
    <div>RoomDetails</div>
  )
}

export default RoomDetails