
import { getSocket } from "@/socket";
import { useEffect } from "react";
import { Outlet, useParams} from "react-router-dom";

export const RoomLayout = ({ children }) => {
  const { roomId } = useParams();

  const socket = getSocket();
  useEffect(() => {
    socket.emit("joinRoom", roomId);
    console.log(`Joined room: ${roomId}`);

    localStorage.setItem("currentRoomId", roomId);

    return () => {
      socket.emit("leaveRoom", roomId);
      console.log(`Left room: ${roomId}`);
      localStorage.removeItem("currentRoomId");
    };
  }, [roomId]);


  return (
    <div className="m-2">
      <Outlet />
    </div>
  );
};
