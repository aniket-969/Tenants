

const Tasks = ({tasks}) => {
    console.log(tasks)
  return (
    <div className="flex gap-4 ">
        {tasks.map((task)=>(
        <div className="flex flex-col" key={task._id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.currentAssignee.fullName}</p>
            <p>{task.title}</p>
        </div>
        ))}
    </div>
  )
}

export default Tasks