import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Room } from "../models/rooms.model.js";

const createRoomTask = asyncHandler(async (req, res) => {
  const createdBy = req.user?._id;
  const {
    title,
    description,
    currentAssignee,
    dueDate,
    participants,
    rotationOrder,
    completed,
    priority,
    recurring,
    recurrencePattern,
    customRecurrence,
  } = req.body;
  const room = await Room.findById(roomId);
  const task = {
    title,
    description,
    currentAssignee,
    dueDate,
    participants,
    rotationOrder,
    completed,
    priority,
    recurring,
    recurrencePattern,
    customRecurrence,
  };
  room.tasks.push(task);

  await room.save();
  const newTask = room.tasks[room.tasks.length - 1];
  return res.json(new ApiResponse(200, newTask, "Task created successfully"));
});
const updateRoomTask = asyncHandler(async (req, res) => {
    const { roomId, taskId } = req.body;
    const updates = req.body; 
  
    const updatedRoom = await Room.findOneAndUpdate(
      { _id: roomId, 'tasks._id': taskId },  
      {
        $set: {
          'tasks.$.title': updates.title,
          'tasks.$.description': updates.description,
          'tasks.$.dueDate': updates.dueDate,
          'tasks.$.priority': updates.priority,
          'tasks.$.completed': updates.completed,
          'tasks.$.completedBy': req.user?._id,
        },
      },
      { new: true, runValidators: true } 
    );
  
    if (!updatedRoom) {
      throw new ApiError(404, 'Task or Room not found');
    }
  
    const updatedTask = updatedRoom.tasks.id(taskId);
    return res.json(new ApiResponse(200, updatedTask, 'Task updated successfully'));
  });
  
  const deleteRoomTask = asyncHandler(async(req,res)=>{
    const {roomId,taskId} = req.body
    const room = await Room.findById(roomId)
    const taskIndex = room.tasks.findIndex(task => task._id.toString() === taskId);

    if (taskIndex === -1) {
      throw new ApiError(404, "Task not found in the room");
    }

    room.tasks.splice(taskIndex,1)

    await room.save()

    return res.json(new ApiResponse(200,{},"Task deleted successfully"))
    
  })

export { createRoomTask,updateRoomTask,deleteRoomTask };
