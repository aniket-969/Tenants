import ProfileCard from "@/components/profileCard";
import QRCode from "@/components/QRCode";
import { RoomHeader } from "@/components/Room/roomHeader";
import RoomList from "@/components/Room/roomList";
import { Navigate, Outlet } from "react-router-dom";

const Room = () => {
  const session = localStorage.getItem("session");

  return session ? (
    <div className=" max-h-screen ">
      <RoomHeader />
      <div className="flex flex-col gap-10 items-center pt-7 ">
        <ProfileCard />
        <div className="flex flex-col-reverse justify-around items-center w-full gap-10 sm:flex-row">
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
