import { Spinner } from "@/components/ui/spinner";
import { useRoom, useRoomMutation } from "@/hooks/useRoom";
import { useParams } from "react-router-dom";
import Maintenance from "./Maintenance";
import RoomExpense from "./RoomExpense";

const RoomDetails = () => {
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

      <RoomExpense/>
    </div>
  );
};

export default RoomDetails;
