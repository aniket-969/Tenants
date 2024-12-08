import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "./ui/spinner";

const RoomList = () => {
  const { sessionQuery } = useAuth();
  const { data, isLoading, isError } = sessionQuery;
  console.log(data);
  if (isLoading) {
    return <Spinner />;
  }
  return <div>RoomList</div>;
};

export default RoomList;
