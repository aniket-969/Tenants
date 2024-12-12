import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createRoomAward,
  deleteRoomAward,
  getRoomAwards,
  updateRoomAward,
} from "@/api/queries/awards";

export const useEvent = () => {
  const queryClient = useQueryClient();

  const awardsQuery = (roomId) =>
    useQuery({
      queryKey: ["awards", roomId],
      queryFn: () => getRoomAwards(roomId),
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      enabled: !!roomId,
    });

  // Create a calendar event
  const createAwardMutation = useMutation({
    mutationFn: ({ data, roomId }) => createRoomAward(roomId, data),
    onSuccess: (data, { roomId }) => {
      queryClient.invalidateQueries(["awards", roomId]);
    },
  });

  // Update award
  const updateAwardMutation = useMutation({
    mutationFn: ({ roomId, awardId, data }) =>
      updateRoomAward(roomId, awardId, data),
    onSuccess: (data, { roomId }) => {
      queryClient.invalidateQueries(["awards", roomId]);
    },
  });

  // Delete a calendar event
  const deleteAwardMutation = useMutation({
    mutationFn: ({ roomId, awardId }) => deleteRoomAward(roomId, awardId),
    onSuccess: (data, { roomId }) => {
      queryClient.invalidateQueries(["awards", roomId]);
    },
  });

  return {
    awardsQuery,
    createAwardMutation,
    deleteAwardMutation,
    updateAwardMutation,
  };
};
