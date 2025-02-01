import { getSocket } from "@/socket";
import { useEffect, useMemo } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

// Separate socket-handling component to prevent re-renders
const RoomSocketHandler = ({ roomId }) => {
  const socket = useMemo(() => getSocket(), []);

  useEffect(() => {
    socket.emit("joinRoom", roomId);
    console.log(`Joined room: ${roomId}`);
    localStorage.setItem("currentRoomId", roomId);

    return () => {
      socket.emit("leaveRoom", roomId);
      console.log(`Left room: ${roomId}`);
      localStorage.removeItem("currentRoomId");
    };
  }, [roomId, socket]);

  return null;
};

export const RoomLayout = () => {
  const { roomId } = useParams();
  const session = localStorage.getItem("session");

  if (!session || !roomId) {
    return <Navigate to="/room" />;
  }

  return (
    <SidebarProvider>
      <RoomSocketHandler roomId={roomId} />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <div className="m-2">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
