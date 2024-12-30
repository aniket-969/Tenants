import { TaskForm } from '@/components/form/TaskForm'
import Tasks from '@/components/Tasks/Tasks'

const RoomTasks = ({tasks,participants}) => {
  return (
    <div>
      <Tasks tasks={tasks}/>
      <TaskForm participants={participants}/>
    </div>
  )
}

export default RoomTasks