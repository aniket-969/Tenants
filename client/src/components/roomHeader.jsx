import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const RoomHeader = () => {
  return (
    <div className="flex items-center justify-between p-3 shadow-md bg-white">
      {/* Leftmost Title: Dashboard */}
      <p className="text- font-semibold text-lg text-primary"> Dashboard</p>

      {/* Navigation Links */}
      <div className="flex space-x-4">
        <Link to="/room/create" className=" ">
          <Button variant="link" size="sm" className="text-primary ">
            {" "}
            Create/Join Room
          </Button>
        </Link>

        <Link to="/">
          <Button className="text-primary " variant="link" size="sm">
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};
