import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Room } from "../models/rooms.model.js";

const createRoomTasks = asyncHandler(async (req, res) => {
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
  

export { createRoomTasks };
