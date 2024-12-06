import {
  addUserRequest,
  createRoom,
  getRoomData,
  adminResponse,
} from "@/api/queries/room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRoom = () => {
  const queryClient = useQueryClient();

  const roomQuery = useQuery(["room", roomId], () => getRoomData(roomId), {
    enabled: !!roomId, 
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 3,
  });

  const createRoomMutation = useMutation(createRoom, {
    onSuccess: (newRoomId) => {
      queryClient.invalidateQueries(["room", newRoomId]);
    },
  });

  const joinRoomMutation = useMutation(addUserRequest, {
    onSuccess: () => {
        console.log("Join request sent successfully");
    },
    onError: (error) => {
      console.error("Failed to send join request", error);
    },
  });

  const adminResponseMutation = useMutation(adminResponse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["room", roomId]);
    },
    onError: (error) => {
      console.error("Failed to send admin response", error);
    },
  });
  return {
    roomQuery,
    createRoomMutation,
    joinRoomMutation,
    adminResponseMutation,
  };
};
