import ProfileCard from "@/components/profileCard";
import QRCode from "@/components/QRCode";
import { RoomHeader } from "@/components/Room/roomHeader";
import RoomList from "@/components/Room/roomList";
import { Outlet } from "react-router-dom";

const Room = () => {
  return (
    <div>
      <RoomHeader />
      <div className="flex flex-col gap-10 items-center by mt-10 mx-5">
        <ProfileCard />
        <div className="flex justify-between w-full ">
          <QRCode />
          <RoomList />
        </div>
      </div>
    </div>
  );
};

export default Room;
