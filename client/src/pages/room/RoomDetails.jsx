import { Spinner } from "@/components/ui/spinner";
import { useRoom, useRoomMutation } from "@/hooks/useRoom";
import { useParams } from "react-router-dom";
import Maintenance from "./Maintenance";
import RoomExpense from "./RoomExpense";
import RoomEvents from "./RoomEvents";
import { getSocket } from "@/socket";
import { useEffect } from "react";

const RoomDetails = () => {
  const socket = getSocket();

  const { roomId } = useParams();
  const joinRoom = (roomId) => {
    console.log(roomId);
    socket.emit("joinRoom", roomId);
  };
  const { roomQuery } = useRoom(roomId);
  const { data, isLoading, isError } = roomQuery;
  console.log(data);
  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", roomId);
      console.log(`Joined room: ${roomId}`);

      return () => {
        socket.emit("leaveRoom", roomId);
        console.log(`Left room: ${roomId}`);
      };
    }
  }, [roomId, socket]);
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

      <Maintenance />
      <RoomEvents />
      <RoomExpense data={data} />
    </div>
  );
};

export default RoomDetails;
