import { deleteMessage, fetchMessages, sendMessage } from "@/api/queries/chat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChat = () => {
  const queryClient = useQueryClient();
  const messageQuery = (roomId) =>
    useQuery({
      queryKey: ["chat"],
      queryFn: () => fetchMessages(roomId),
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      enabled: !!roomId,
    });

  const sendMessageMutation = useMutation({
    mutationFn: ({ data, roomId }) => sendMessage(data, roomId),
    onSuccess: () => {
    //   queryClient.invalidateQueries(["chat"]);
    
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: ({ roomId, messageId }) => deleteMessage(roomId, messageId),
    onSuccess: () => {
      queryClient.invalidateQueries(["chat"]);
    },
  });

  return { messageQuery, sendMessageMutation, deleteMessageMutation };
};
