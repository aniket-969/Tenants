import { getSocket } from "@/socket";
import { useEffect, useRef } from "react";
import { Outlet, useParams } from "react-router-dom";

export const RoomLayout = ({ children }) => {
  const socket = getSocket(); 
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      // Join room only if it's a new room
      socket.emit("joinRoom", roomId);
      console.log(`Joined room: ${roomId}`);
    }

    return () => {
      // Leave room when the user navigates away from the room entirely
      if (roomId) {
        socket.emit("leaveRoom", roomId);
        console.log(`Left room: ${roomId}`);
      }
    };
  }, [roomId, socket]);

  return (
    <>
      <Outlet />
    </>
  );
};
