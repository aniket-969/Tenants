import { Spinner } from "@/components/ui/spinner";
import { useRoom } from "@/hooks/useRoom";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { SocketContext } from "@/socket";
import PollVote from "@/components/PollVote";
import { PollForm } from "@/components/form/PollForm";
import PollVote from "@/components/Poll/PollVote";
import { getSocket } from "@/socket";
import { useEffect } from "react";
import RoomTasks from "./RoomTasks";

const RoomDetails = () => {
  const { roomId } = useParams();

  const { roomQuery } = useRoom(roomId);
  const { data, isLoading, isError } = roomQuery;
  const { joinRoom, leaveRoom, socket } = useContext(SocketContext);
  useEffect(() => {
    joinRoom(roomId)
    return(()=>{
      leaveRoom(roomId)
    })
  }, [roomId]);
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <>Something went wrong. Please refresh.</>;
  }
  const participants = [
    ...(data.tenants || []),
    ...(data.landlord ? [data.landlord] : []),
  ];
  return (
    <div>
      <div>
        <p>{data.name}</p>
        <p>{data.description}</p>
      </div>
      {/* <PollForm /> */}
      {/* <PollVote initialPolls={data.polls} /> */}
      {/* <Maintenance maintenance = {data.maintenanceRequests}/> */}
      {/* <RoomTasks initialTasks={data.tasks} participants={participants}/> */}
      {/* <RoomEvents /> */}
      {/* <RoomExpense data={data} /> */}
    </div>
  );
};

export default RoomDetails;
