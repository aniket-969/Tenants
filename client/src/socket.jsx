import { createContext, useMemo, useContext, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io(process.env.REACT_APP_SOCKET_SERVER || "http://localhost:3000", {
        withCredentials: true,
        auth: { token: localStorage.getItem("authToken") },
      }),
    []
  );

  useEffect(() => {
    // Handle socket connection errors
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider };