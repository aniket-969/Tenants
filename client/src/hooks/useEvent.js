import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getSingleCalendarEvent,
  getRoomCalendarEvent,
  getMonthlyCalendarEvent,
} from "./../api/queries/event";

export const useEvent = () => {
  const queryClient = useQueryClient();

  // Fetch single event details
  const singleEventQuery = (roomId, eventId) =>
    useQuery({
      queryKey: ["event", roomId, eventId],
      queryFn: () => getSingleCalendarEvent(eventId),
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      enabled: !!eventId,
    });

  // Fetch all room events
  const roomEventsQuery = (roomId) =>
    useQuery({
      queryKey: ["roomEvents", roomId],
      queryFn: () => getRoomCalendarEvent(roomId),
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      enabled: !!roomId,
    });

  // Fetch monthly events
  const monthlyEventsQuery = (roomId) =>
    useQuery({
      queryKey: ["monthlyEvents", roomId],
      queryFn: () => getMonthlyCalendarEvent(roomId),
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      enabled: !!roomId,
    });

  // Create a calendar event
  const createEventMutation = useMutation({
    mutationFn: ({data,roomId}) => createCalendarEvent(data, roomId),
    onSuccess: (data, { roomId }) => {
      queryClient.invalidateQueries(["roomEvents", roomId]);
      queryClient.invalidateQueries(["monthlyEvents", roomId]);
    },
  });

  // Delete a calendar event
  const deleteEventMutation = useMutation({
    mutationFn: ( {roomId, eventId} ) => deleteCalendarEvent(roomId, eventId),
    onSuccess: (data, { roomId }) => {
      queryClient.invalidateQueries(["roomEvents", roomId]);
      queryClient.invalidateQueries(["monthlyEvents", roomId]);
    },
  });

  return {
    singleEventQuery,
    roomEventsQuery,
    monthlyEventsQuery,
    createEventMutation,
    deleteEventMutation,
  };
};
