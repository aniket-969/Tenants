
import PollVoteForm from "./form/PollVoteForm";

function PollVote({ polls }) {
  console.log(polls);
 
  return ( 
    <div>
       {polls.map((poll)=>(
       <PollVoteForm poll={poll} key={poll._id}/>
      
    ))}
    </div>
   
  );
}

export default PollVote;
