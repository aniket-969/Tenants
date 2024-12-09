import { Spinner } from "@/components/ui/spinner";
import { useRoom, useRoomMutation } from "@/hooks/useRoom";
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const { roomId } = useParams();
  const { roomQuery } = useRoom(roomId);
  const { data, isLoading, isError } = roomQuery;


  if (isLoading) {
    return <Spinner />;
  }
  if(isError){
    return <>
    Something went wrong . Please refresh</>
  }
  
  return (
    <div>
      RoomDetails
      <p>{data.name}</p>
      <p>{data.description}</p>
    </div>
  );
};

export default RoomDetails;
