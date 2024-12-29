import { createRoomTask, deleteRoomTask, updateRoomTask } from "@/api/queries/task";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  import { useNavigate } from "react-router-dom";
  
  export const useTask = (taskId) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  
  const createTaskMutation = useMutation({
    mutationFn: (newTaskData) =>
      createTask(roomId, newTaskData),
    onSuccess: () => {
      queryClient.invalidateQueries(["room", roomId]);
    },
  });
  
    const updateTaskMutation = useMutation({
      queryFn: updateRoomTask,
      onSuccess: (taskId) => {
        queryClient.invalidateQueries(["Task", taskId]);
      },
    });
  
    const deleteTaskMutation = useMutation({
      queryFn: deleteRoomTask,
      onSuccess: () => {
        console.log("Task deleted successfully");
        queryClient.invalidateQueries(["auth", "session"]);
        navigate("/Task");
      },
    });
  
  
    return {
      createTaskMutation,
      updateTaskMutation,
      deleteTaskMutation,
    };
  };
   
 