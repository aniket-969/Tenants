

const Tasks = ({tasks}) => {
    // console.log(tasks)
  return (
    <div>
        {tasks.map((task)=>(
        <div key={task._id}>
            {task.title}
            {task.description}
            {task.title}
            {task.title}
        </div>
        ))}
    </div>
  )
}

export default Tasks