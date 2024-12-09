import { asyncHandler } from "../utils/asyncHandler.js";
import { Room } from "../models/rooms.model.js";
import { ApiError } from "../utils/ApiError.js";

const checkMember = asyncHandler(async (req, res, next) => {
  const roomId = req.body?.roomId || req.params?.roomId;
  if (!roomId) {
    throw new ApiError(404, "Room Id is required");
  }
  console.log("verifying room");
  const createdBy = req.user?._id;
  const room = await Room.findById(roomId);
  if (!room) throw new ApiError(404, "Room not found");

  const isMember =
    room.tenants?.includes(createdBy) ||
    room.landlord?.toString() === createdBy.toString();

  if (!isMember) throw new ApiError(403, "Unauthorized member");

  next();
});

const adminOnly = asyncHandler(async (req, res, next) => {
  const roomId = req.body?.roomId || req.params?.roomId;
  if (!roomId) {
    throw new ApiError(404, "Room Id is required");
  }
  console.log("verifying admin");
  const createdBy = req.user?._id;
  const room = await Room.findById(roomId);
  if (!room) throw new ApiError(404, "Room not found");

  const isAdmin = room.admin.toString() === createdBy.toString();

  if (!isAdmin) throw new ApiError(403, "Only admin can send this request");

  next();
});

export { checkMember };
