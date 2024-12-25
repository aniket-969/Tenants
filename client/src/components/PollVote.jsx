import { useAuth } from "@/hooks/useAuth";
import PollVoteForm from "./form/PollVoteForm";
import { PollResults } from "./PollResults";
import { useEffect, useState } from "react";
import { getSocket } from "@/socket";

const PollVote = ({ initialPolls }) => {
  const [polls, setPolls] = useState(initialPolls);
  const { sessionQuery } = useAuth();
  const { data: user, isLoading, isError } = sessionQuery;

  const socket = getSocket();

  useEffect(() => {
    const handleCreatePoll = (newPoll) => {
      console.log(newPoll);
    };
    const handleCastVote = (newMessage) => {
      console.log(newMessage);
    };

    socket.on("createPoll", handleCreatePoll);
    socket.on("castVote", handleCastVote);

    return () => {
      socket.off("createPoll", handleCreatePoll);
      socket.off("castVote", handleCastVote);
    };
  }, [socket]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {polls.map((poll) =>
        poll.voters.includes(user._id) ? (
          <PollResults poll={poll} key={poll._id} />
        ) : (
          <PollVoteForm poll={poll} key={poll._id} />
        )
      )}
    </div>
  );
};

export default PollVote;
