import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getSingleCalendarEvent,
  getRoomCalendarEvent,
  getMonthlyCalendarEvent,
} from "./../api/queries/event";
import {
  createRoomAward,
  deleteRoomAward,
  updateRoomAward,
} from "@/api/queries/awards";

export const useEvent = () => {
  const queryClient = useQueryClient();

  // Create a calendar event
  const createAwardMutation = useMutation({
    mutationFn: ({ data, roomId }) => createRoomAward(roomId, data),
    onSuccess: (data, { roomId }) => {
      queryClient.invalidateQueries(["roomEvents", roomId]);
    },
  });

  // Update award
  const updateAwardMutation = useMutation({
    mutationFn: ({ roomId, awardId, data }) =>
      updateRoomAward(roomId, awardId, data),
    onSuccess: (data, { roomId }) => {
      queryClient.invalidateQueries(["roomEvents", roomId]);
    },
  });

  // Delete a calendar event
  const deleteAwardMutation = useMutation({
    mutationFn: ({ roomId, awardId }) => deleteRoomAward(roomId, awardId),
    onSuccess: (data, { roomId }) => {
      queryClient.invalidateQueries(["roomEvents", roomId]);
    },
  });

  return {
    createAwardMutation,
    deleteAwardMutation,
    updateAwardMutation,
  };
};
