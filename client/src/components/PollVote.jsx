
const PollVote = ({polls}) => {

    console.log(polls)
  return (
    <div>
        <h2>Polls</h2>
        {polls.map((poll)=>(
            <div key={poll._id}>
               <h3>{poll.title}</h3>  
                 <div>
                    {poll.options.map((option)=>{
                        
                    })}
                 </div>
            </div>
        ))}
    </div>
  )
}

export default PollVote