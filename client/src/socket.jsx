import { createContext, useMemo, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
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

  const joinRoom = (roomId) => {
    console.log("in join");
    if (roomId !== "null") {
      console.log("joined", roomId);
      localStorage.setItem("roomId", roomId);
    }
  };

  const leaveRoom = (roomId) => {
    if (roomId !== "null") {
      console.log("let's leave", roomId);
    }
    localStorage.removeItem("roomId");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      const roomId = localStorage.getItem("roomId");

      if (
        !location.pathname.startsWith("/room") ||
        location.pathname.startsWith("/room/create")
      ) {
        console.log("not in room ");
        if (roomId !== "null") {
          leaveRoom(roomId);
        }
      } else {
        console.log("in room with id's");
        if (roomId !== "null") 
        joinRoom(roomId);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });
    socket.onAny((event, data) => {
      console.log(`Received event: ${event}`, data);
    });
    
    return () => {
      socket.disconnect();
    };
  }, [socket, location]);

  return (
    <SocketContext.Provider value={{ socket, joinRoom, leaveRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
