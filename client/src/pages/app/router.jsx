import React, { useMemo } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "@/layouts/Layout.jsx";
import AuthLayout from "@/layouts/AuthLayout.jsx";
import { useQueryClient } from "@tanstack/react-query"; // Import queryClient hook
import { NotFound } from "../NotFound.jsx";

const LandingPage = React.lazy(() => import("../LandingPage.jsx"));
const Login = React.lazy(() => import("../auth/Login.jsx"));
const Register = React.lazy(() => import("../auth/Register.jsx"));

export const AppRouter = () => {
  const queryClient = useQueryClient(); // Get the queryClient instance

  // Use useMemo to avoid recreating the router on every render
  const router = useMemo(
    () =>
      createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<LandingPage />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </>
        )
      ),
    [queryClient] 
  );

  return <RouterProvider router={router} />;
};
