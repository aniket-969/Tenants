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

  await room.save()
  const newTask = room.tasks[room.tasks.length - 1];
  return res.json(new ApiResponse(200,newTask,"Task created successfully"))

});

const updateRoomTask = asyncHandler(async(req,res)=>{
    
})

export {createRoomTasks}
