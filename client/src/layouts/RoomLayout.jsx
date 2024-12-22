import { getSocket } from "@/socket";
import { useEffect, useRef } from "react";
import { Outlet, useParams } from "react-router-dom";

export const RoomLayout = ({ children }) => {
  const socket = getSocket(); // Ensure this is a singleton instance
  const { roomId } = useParams();
  const previousRoomId = useRef(null);

  useEffect(() => {
    if (roomId && roomId !== previousRoomId.current) {
      
      // Join room only if it's a new room
      socket.emit("joinRoom", roomId);
      console.log(`Joined room: ${roomId}`);
      previousRoomId.current = roomId;
    }

    return () => {
      // Leave room when the user navigates away from the room entirely
      if (previousRoomId.current) {
        socket.emit("leaveRoom", previousRoomId.current);
        console.log(`Left room: ${previousRoomId.current}`);
        previousRoomId.current = null;
      }
    };
  }, [roomId, socket]);
  return (
    <>
      <Outlet />
    </>
  );
};
