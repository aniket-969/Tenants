
import { Outlet} from "react-router-dom";

export const RoomLayout = ({ children }) => {

  // useEffect(() => {
  //   // Join room only if it's a new room

  //   socket.emit("joinRoom", roomId);
  //   console.log(`Joined room: ${roomId}`);

  //   return () => {
  //     // Leave room when the user navigates away from the room entirely

  //     socket.emit("leaveRoom", roomId);
  //     console.log(`Left room: ${roomId}`);
  //   };
  // }, [roomId, socket]);

  return (
    <>
      <Outlet />
    </>
  );
};
