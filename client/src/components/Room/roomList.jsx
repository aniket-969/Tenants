import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { Link } from "react-router-dom";

const RoomList = () => {


  const { sessionQuery } = useAuth();
  const { data, isLoading, isError } = sessionQuery;
  //   console.log(data);

  if (isLoading) {
    return <Spinner />;
  }
  if(isError){
    return <>
    Something went wrong . Please refresh</>
  }
  return (
    <div className="flex flex-col gap-5">
      {data.rooms.map((room) => (
        <Link key={room._id} to={`/room/${room.roomId}`}>
          <div  className="br">
            <h2 className="text-white text-lg">{room.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RoomList;
