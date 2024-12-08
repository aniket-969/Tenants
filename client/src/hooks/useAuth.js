import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  fetchSession,
  loginUser,
  logOut,
  refreshTokens,
  registerUser,
  updateUser,
} from "@/api/queries/auth";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const sessionQuery = useQuery({
    queryKey: ["auth", "session"],
    queryFn: fetchSession,
    enabled: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  // Login User Mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["auth", "session"]);
      navigate("/room");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  // Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "session"]);
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });

  // Refresh Tokens Mutation
  const refreshTokensMutation = useMutation({
    mutationFn: refreshTokens,
    onSuccess: (data) => {
      //  refreshing tokens
    },
    onError: (error) => {
      console.error("refresh token error:", error);
    },
  });

  // Update User Mutation
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "profile"]);
    },
    onError: (error) => {
      console.error("update user error", error);
    },
  });

  // Change Password Mutation
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "profile"]);
    },
    onError: (error) => {
      console.error("change password error:", error);
    },
  });

  return {
    sessionQuery,
    registerMutation,
    loginMutation,
    changePasswordMutation,
    refreshTokensMutation,
    logoutMutation,
    updateUserMutation,
  };
};
