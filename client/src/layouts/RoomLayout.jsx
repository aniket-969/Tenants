
import { getSocket } from "@/socket";
import { useEffect } from "react";
import { Outlet, useParams} from "react-router-dom";

export const RoomLayout = ({ children }) => {
  const { roomId } = useParams();

<<<<<<< HEAD
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

=======
>>>>>>> b93ec3646ef923c19b58d6d75f89844055b16ee5

  return (
    <div className="m-2">
      <Outlet />
    </div>
  );
};
