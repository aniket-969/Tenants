import { Spinner } from "@/components/ui/spinner";
import { useRoom, useRoomMutation } from "@/hooks/useRoom";
import { useParams } from "react-router-dom";
import Maintenance from "./Maintenance";
import RoomExpense from "./RoomExpense";
import RoomEvents from "./RoomEvents";
import { PollForm } from "@/components/form/PollForm";
import PollVote from "@/components/PollVote";
import { getSocket } from "@/socket";
import { useEffect } from "react";

const RoomDetails = () => {
  const { roomId } = useParams();

  // const socket = getSocket();

  // useEffect(() => {
  //   socket.emit("joinRoom", roomId);
  //   console.log(`Joined room: ${roomId}`);

  //   return () => {
  //     socket.emit("leaveRoom", roomId);
  //     console.log(`Left room: ${roomId}`);
  //   };
  // }, [roomId, socket]);

  const { roomQuery } = useRoom(roomId);
  const { data, isLoading, isError } = roomQuery;
  // console.log(data);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <>Something went wrong . Please refresh</>;
  }

  return (
    <div>
      <div>
        <p>{data.name}</p>
        <p>{data.description}</p>
      </div>
      <PollForm />
      <PollVote initialPolls={data.polls} />
      {/* <Maintenance /> */}
      {/* <RoomEvents /> */}
      {/* <RoomExpense data={data} /> */}
    </div>
  );
};

export default RoomDetails;
