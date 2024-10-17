import { Room } from "../models/rooms.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getRoomAwards = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const room = await Room.findById(roomId).populate("tenants landlord");
  if (!room) throw new ApiError(404, "Room not found");

  const roomUsers = [...room.tenants, room.landlord];

  const awards = await AwardTemplate.find({
    awardedTo: { $in: roomUsers },
  }).populate("awardTemplate awardedTo");

  if (!awards.length) {
    throw new ApiError(404, "No awards found");
  }

  return res.json(
    new ApiResponse(200, awards, "Room awards fetched successfully")
  );
});

const customRoomAward = asyncHandler(async (req, res) => {
  const { roomId, title, description, image, criteria } = req.body;

  const room = Room.findById(roomId);

  const awards = {
    title,
    description,
    image,
    criteria,
  };

  room.awards.push(awards);
  await room.save();

  const newAward = room.awards[room.awards.length - 1];

  return res.json(
    new ApiResponse(200, newAward, "Custom award created successfully")
  );
});

export { getRoomAwards,customRoomAward };
