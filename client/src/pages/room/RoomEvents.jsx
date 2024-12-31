import { EventsForm } from '@/components/form/EventsForms'
import { Spinner } from '@/components/ui/spinner'
import { useEvent } from '@/hooks/useEvent'
import { getSocket } from '@/socket'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const RoomEvents = () => {

const {roomId} = useParams()
const {roomEventsQuery} = useEvent()
const {isLoading,data,isError} = roomEventsQuery(roomId)
// console.log(data);
const socket = getSocket();

  useEffect(() => {
    const handleCreateEvent = (newEvent) => {
      console.log(newEvent)
     
    };

    socket.on("createdEvent", handleCreateEvent);

    return () => {
      socket.off("createdEvent", handleCreateEvent);
    };
  }, [socket]);

if (isLoading) {
  return <Spinner />;
}
if (isError) {
  return <>Something went wrong . Please refresh</>;
}

  return (
    <div className='flex flex-col justify-center items-center'>RoomEvents
        <EventsForm/>
    </div>
  )
}

export default RoomEvents