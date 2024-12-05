import { CreateRoomForm } from "@/components/form/CreateRoomForm";
import { JoinRoom } from "@/components/form/JoinRoom";

const CreateRoom = () => {
  return (
    <div className="flex items-center justify-center flex-col ">
      <h1>Create/Join Room</h1>
     {/* <CreateRoomForm/> */}
     <JoinRoom/>
    </div>
  );
};

export default CreateRoom;
