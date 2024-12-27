import { createContext, useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

export const SocketContext = createContext();
let socketInstance;

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(
      import.meta.env.REACT_APP_SOCKET_SERVER || "http://localhost:3000",
      {
        withCredentials: true,
      }
    );
  }
  return socketInstance;
};

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => getSocket(), []);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const location = useLocation();

  const joinRoom = (roomId) => {
    if (currentRoomId !== roomId) {
      if (currentRoomId) {
        socket.emit("leaveRoom", currentRoomId);
        console.log(`Left room: ${currentRoomId}`);
      }
      socket.emit("joinRoom", roomId);
      console.log(`Joined room: ${roomId}`);
      setCurrentRoomId(roomId);
      localStorage.setItem("currentRoomId", roomId);
    }
  };

  const leaveRoom = () => {
    const roomId = localStorage.getItem("currentRoomId");
    if (currentRoomId) {
      socket.emit("leaveRoom", currentRoomId);
      console.log(`Left room: ${currentRoomId}`);
      localStorage.removeItem("currentRoomId");
      setCurrentRoomId(null);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);

    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
