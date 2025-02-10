import { TaskForm } from "@/components/form/tasks/TaskForm";
import Tasks from "@/components/Tasks/Tasks";
import { getSocket } from "@/socket";
import { useEffect, useState } from "react";

const RoomTasks = ({ initialTasks, participants }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const socket = getSocket();
 
  useEffect(() => {
    const handleCreateTask = (newTask) => {
      console.log("create it");
      setTasks((prevTask) => [...prevTask, newTask]);
    };

    socket.on("createdTask", handleCreateTask);

    return () => {
      socket.off("createdTask", handleCreateTask);
    };
  }, [socket]);

  return (
    <div>
      <Tasks tasks={tasks} />
      <TaskForm participants={participants} />
    </div>
  );
};

export default RoomTasks;
