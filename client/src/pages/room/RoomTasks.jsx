import { TaskForm } from '@/components/form/TaskForm'
import Tasks from '@/components/Tasks/Tasks'

const RoomTasks = ({tasks}) => {
  return (
    <div>
      <Tasks tasks={tasks}/>
      <TaskForm/>
    </div>
  )
}

export default RoomTasks