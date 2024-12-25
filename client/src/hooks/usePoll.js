import { castVote, createPoll, deletePoll } from "@/api/queries/poll";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const usePoll = () => {
  const queryClient = useQueryClient();

  const createPollMutation = useMutation({
    mutationFn: ({data, roomId}) => createPoll(data, roomId),
    onSuccess: () => {
      toast("Poll created successfully");
    },
  });

  const deletePollMutation = useMutation({
    mutationFn: (pollId) => deletePoll(roomId),
    onSuccess: () => {
      toast("Poll deleted successfully");
    },
  });

  const castVoteMutation = useMutation({
    mutationFn: ({pollId, optionId}) => castVote(pollId, optionId),
    onSuccess: () => {
      toast("Vote added successfully");
    },
  });

  return {
    createPollMutation,
    deletePollMutation,
    castVoteMutation
  };
};
