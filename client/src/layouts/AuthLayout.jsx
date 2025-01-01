import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const session = localStorage.getItem("session");

  return session ? (
    <Navigate to="/room" />
  ) : (
    <div className="flex items-center justify-center flex-col gap-4 h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
