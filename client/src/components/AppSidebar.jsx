import { Award, Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const [roomId, setRoomId] = useState(null);
  useEffect(() => {
    const storedRoomId = localStorage.getItem("currentRoomId");
    setRoomId(storedRoomId);
  }, []);
  // Menu items with dynamic roomId
  const items = [
    { title: "Home", url: "/room", icon: Home },
    { title: "Room", url: roomId ? `/room/${roomId}` : "/room", icon: Inbox },
    {
      title: "Awards",
      url: roomId ? `/room/${roomId}/awards` : "/room/awards",
      icon: Award,
    },
    {
      title: "Events",
      url: roomId ? `/room/${roomId}/events` : "/room/events",
      icon: Settings,
    },
    {
      title: "Expense",
      url: roomId ? `/room/${roomId}/expense` : "/room/expense",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title} // This adds tooltips when sidebar is collapsed
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
