import { Spinner } from "@/components/ui/spinner";
import { useRoom, useRoomMutation } from "@/hooks/useRoom";
import { useParams } from "react-router-dom";
import Maintenance from "./Maintenance";
import RoomExpense from "./RoomExpense";
import RoomEvents from "./RoomEvents";
import { PollForm } from "@/components/form/PollForm";
import PollVote from "@/components/Poll/PollVote";
import { getSocket } from "@/socket";
import { useEffect } from "react";
import RoomTasks from "./RoomTasks";
import RoomCalendar from "./RoomCalendar";
import Chat from "./Chat";

const RoomDetails = () => {
  const { roomId } = useParams();

  const { roomQuery } = useRoom(roomId);
  const { data, isLoading, isError } = roomQuery;
  // console.log(data);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <>Something went wrong . Please refresh</>;
  }
  const participants = [
    ...(data.tenants || []),
    ...(data.landlord ? [data.landlord] : []),
  ];
  // console.log(data)
  return (
    <div>
      <div>
        <p>{data.name}</p>
        <p>{data.description}</p>
      </div>
      <div className="flex gap-5 justify-center">
         <RoomCalendar tasks={data.tasks}/>
      <Chat/>
      </div>
     
    </div>
  );
};

export default RoomDetails;
