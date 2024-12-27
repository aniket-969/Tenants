import { Spinner } from "@/components/ui/spinner";
import { useRoom } from "@/hooks/useRoom";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { SocketContext } from "@/socket";
import PollVote from "@/components/PollVote";
import { PollForm } from "@/components/form/PollForm";

const RoomDetails = () => {
  const { roomId } = useParams();
  
  const { roomQuery } = useRoom(roomId);
  const { data, isLoading, isError } = roomQuery;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <>Something went wrong. Please refresh.</>;
  }

  return (
    <div>
      <div>
        <p>{data.name}</p>
        <p>{data.description}</p>
      </div>
      <PollForm />
      <PollVote initialPolls={data.polls} />
    </div>
  );
};

export default RoomDetails;
