import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const RoomHeader = () => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-100 shadow-md">
      {/* Leftmost Title: Dashboard */}
     <p className="text-background font-semibold text-lg">  Dashboard</p>
      
      {/* Navigation Links */}
      <div className="flex space-x-4">
        <Link
          to="/room/create"
          className=" "
        >
            <Button  variant="link" size="sm"> Create/Join Room</Button>
         
        </Link>
       
        <Link
          to="/"
          
        >
            <Button variant="link" size="sm">Logout</Button>
          
        </Link>
      </div>
    </div>
  );
};
