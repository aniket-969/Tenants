import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser } from "@/api/queries/auth";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const sessionQuery = useQuery(["auth", "session"], registerUser, {
    enabled: false,
  });

  const registerMutation = useMutation(registerUser, {
    onSuccess: (data) => {
        console.log(data)
        queryClient.invalidateQueries(["auth", "session"])},
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  // Login User Mutation
  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["auth", "session"]);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  // Logout Mutation
  const logoutMutation = useMutation(logOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "session"]);
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });

  // Refresh Tokens Mutation
  const refreshTokensMutation = useMutation(refreshTokens, {
    onSuccess: (data) => {
      //  refreshing tokens
    },
    onError: (error) => {
      console.error("refresh token error:", error);
    },
  });

  // Update User Mutation
  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "profile"]);
    },
    onError: (error) => {
      console.error("update user error", error);
    },
  });

  // Change Password Mutation
  const changePasswordMutation = useMutation(changePassword, {
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
    changePasswordMutation,
    updateUserMutation,
  };
};
