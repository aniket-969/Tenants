import React from 'react'

export const PollResults = ({poll}) => {
    console.log(poll)
  return (
    <div className='flex flex-col gap-3'>
        <h3>{poll.title}</h3>
        <div>
            {poll.options.map((option)=>(
            <p key={option._id}>{option.optionText}</p>
        ))}
        
        </div>
        
    
    </div>
  )
}
