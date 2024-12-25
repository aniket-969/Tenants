import { useAuth } from "@/hooks/useAuth";
import PollVoteForm from "./form/PollVoteForm";
import { PollResults } from "./PollResults";

const PollVote = ({ polls }) => {
  const { sessionQuery } = useAuth();
  const { data: user, isLoading, isError } = sessionQuery;

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
