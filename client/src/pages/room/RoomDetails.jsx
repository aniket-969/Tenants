import { Spinner } from "@/components/ui/spinner";
import { useRoom, useRoomMutation } from "@/hooks/useRoom";
import { useParams } from "react-router-dom";
import Maintenance from "./Maintenance";
import RoomExpense from "./RoomExpense";
import RoomEvents from "./RoomEvents";
import { getSocket } from "@/socket";

const RoomDetails = () => {
  const socket = getSocket();
  console.log(socket);
  const { roomId } = useParams();
  const { roomQuery } = useRoom(roomId);
  const { data, isLoading, isError } = roomQuery;
  console.log(data);
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
