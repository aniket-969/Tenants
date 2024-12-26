import { getSocket } from "@/socket";
import { useEffect, useRef } from "react";
import { Outlet, useParams } from "react-router-dom";

export const RoomLayout = ({ children }) => {

  return (
    <>
      <Outlet />
    </>
  );
};
