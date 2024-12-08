import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Spinner } from "./ui/spinner";

const ProfileCard = () => {
  const { sessionQuery } = useAuth();
  const { data, isLoading, isError } = sessionQuery;
//   console.log(data);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="w-[5rem]">
        <img src={data.avatar} alt="" />
      </div>
      <div className="flex gap-5">
        <h2>{data.fullName}</h2>
        <p>{data.username}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
