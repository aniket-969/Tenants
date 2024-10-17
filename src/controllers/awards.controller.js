import { Room } from "../models/rooms.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const customRoomAward = asyncHandler(async (req, res) => {
  const { roomId, title, description, image, criteria, assignedTo } = req.body;

  const room = await Room.findById(roomId);

  const award = {
    title,
    description,
    image,
    criteria,
    assignedTo,
  };

  room.awards.push(award);
  await room.save();

  const newAward = room.awards[room.awards.length - 1];

  return res.json(
    new ApiResponse(200, newAward, "Custom award created successfully")
  );
});

export { customRoomAward };
