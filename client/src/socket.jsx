import { createContext, useMemo, useContext, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {

  const socket = useMemo(
    () =>
      io(import.meta.env.REACT_APP_SOCKET_SERVER || "http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    // Handle socket connection errors
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider };
