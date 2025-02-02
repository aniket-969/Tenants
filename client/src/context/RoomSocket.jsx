import React, { createContext, useContext, useEffect } from 'react';
import { getSocket } from '@/socket';

const RoomSocketContext = createContext();

export const useRoomSocket = () => useContext(RoomSocketContext);

export const RoomSocketProvider = ({ children }) => {
  const socket = getSocket();

  const joinRoom = (roomId) => {
    if (roomId) {
      socket.emit("joinRoom", roomId);
      console.log(`Joined room: ${roomId}`);
      localStorage.setItem("currentRoomId", roomId);
    }
  };

  const leaveRoom = (roomId) => {
    if (roomId) {
      socket.emit("leaveRoom", roomId);
      console.log(`Left room: ${roomId}`);
      localStorage.removeItem("currentRoomId");
    }
  };

  return (
    <RoomSocketContext.Provider value={{ joinRoom, leaveRoom }}>
      {children}
    </RoomSocketContext.Provider>
  );
};