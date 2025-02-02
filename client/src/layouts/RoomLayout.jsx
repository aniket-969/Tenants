import { getSocket } from "@/socket";
import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useRoomSocket } from "@/context/RoomSocket";

export const RoomLayout = () => {
  const { roomId } = useParams();
  const { joinRoom, leaveRoom } = useRoomSocket();
  const session = localStorage.getItem("session");

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
      return () => leaveRoom(roomId);
    }
  }, [roomId]);

  if (!session || !roomId) {
    return <Navigate to="/room" />;
  }

  return (
    <SidebarProvider>
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
