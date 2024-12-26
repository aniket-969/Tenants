import { useAuth } from "@/hooks/useAuth";
import PollVoteForm from "./form/PollVoteForm";
import { PollResults } from "./PollResults";
import { useEffect, useState } from "react";
import { getSocket } from "@/socket";
import { useParams } from "react-router-dom";

const PollVote = ({ initialPolls }) => {
  const [polls, setPolls] = useState(initialPolls);
  const { sessionQuery } = useAuth();
  const { data: user, isLoading, isError } = sessionQuery;
  const { roomId } = useParams();
  const socket = getSocket();  

  useEffect(() => {
    console.log("socket poll");
    const handleCreatePoll = (newPoll) => {
      console.log("create it");
      setPolls((prevPoll) => [...prevPoll, newPoll]);
    };
    const handleCastVote = (data) => {
      console.log("cast it");
      console.log(data);
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
