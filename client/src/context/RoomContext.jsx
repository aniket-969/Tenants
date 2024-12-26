import { getSocket } from "@/socket";
import { useParams } from "react-router-dom";
import { createContext } from "react";
import { useEffect } from "react";
const RoomContext = createContext();

export const useRoom = () => useContext(RoomContext);

const RoomProvider = ({ children }) => {
  const params = useParams();
  const roomId = params["*"]; 

  console.log(roomId);
  const socket = getSocket();

  useEffect(() => {
    socket.emit("joinRoom", roomId);
    console.log(`Joined room: ${roomId}`);

    return () => {
      socket.emit("leaveRoom", roomId);
      console.log(`Left room: ${roomId}`);
    };
  }, [roomId, socket]);

  return (
    <RoomContext.Provider value={{ roomId }}>{children}</RoomContext.Provider>
  );
};

export default RoomProvider