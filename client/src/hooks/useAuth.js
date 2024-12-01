import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";

import { registerUser } from "@/api/queries/auth";

export const useAuth = ()=>{
    const queryClient = useQueryClient()

    const authsQuery = useQuery(['auth'],registerUser,{enabled:false,})

    const registerMutation = useMutation(registerUser, {
        onSuccess: () => queryClient.invalidateQueries(["auth"]),
        onError: (error) => {
          console.error("Registration failed:", error);
        },
      });
      

    return {authsQuery,registerMutation}

}