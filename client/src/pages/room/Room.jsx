import ProfileCard from "@/components/profileCard";
import QRCode from "@/components/QRCode";
import { RoomHeader } from "@/components/Room/roomHeader";
import RoomList from "@/components/Room/roomList";
import { Navigate, Outlet } from "react-router-dom";

const Room = () => {
  const session = localStorage.getItem("session");

  return session ? (
    <div>
      <RoomHeader />
      <div className="flex flex-col gap-10 items-center by mt-10 mx-3">
        <ProfileCard />
        <div className="flex justify-around w-full px-5">
          <QRCode />
          <RoomList />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Room;
