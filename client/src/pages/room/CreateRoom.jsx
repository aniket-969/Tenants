import { RoomForm } from "@/components/form/RoomForm";
import React from "react";

const CreateRoom = () => {
  return (
    <div className="flex items-center justify-center flex-col ">
      <h1>Create/Join Room</h1>
     <RoomForm/>
    </div>
  );
};

export default CreateRoom;
