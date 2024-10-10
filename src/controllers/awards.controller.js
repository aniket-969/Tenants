import { Room } from "../models/rooms.model.js";

const isRoomMember = async (roomId, userId) => {
  const room = await Room.findById(roomId);
  if (!room) throw new ApiError(404, "Room not found");

  const isMember =
    room.tenants.some((tenant) => tenant.equals(userId)) ||
    room.landlord.equals(userId);

  if (!isMember) throw new ApiError(403, "User is not a member of this room");

  return room; 
};


