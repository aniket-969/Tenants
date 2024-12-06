import { asyncHandler } from "../utils/asyncHandler.js";
import { Room } from "../models/rooms.model.js";
import { ApiError } from "../utils/ApiError.js";

const checkMember = asyncHandler(async (req, res,next) => {
  const roomId = req.body?.roomId || req.params?.roomId;
if(!roomId){
  throw new ApiError(404,"Room Id is required")
}
  const createdBy = req.user?._id;
  const room = await Room.findById(roomId);
  if (!room) throw new ApiError(404, "Room not found");

  const isMember =
    room.tenants.includes(createdBy) || room.landlord.toString() === createdBy;

  if (!isMember) throw new ApiError(403, "Unauthorized member");

  next();
});

export { checkMember };
