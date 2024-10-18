import { Room } from "../models/rooms.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { User } from "../models/user.model.js";

function generateGroupCode() {
  return crypto.randomBytes(6).toString("hex").slice(0, 6).toUpperCase();
}

async function generateUniqueGroupCode() {
  let isUnique = false;
  let groupCode;

  while (!isUnique) {
    groupCode = generateGroupCode();

    const existingRoom = await Room.findOne({ groupCode });

    if (!existingRoom) {
      isUnique = true;
    }
  }

  return groupCode;
}

const createRoom = asyncHandler(async (req, res) => {
  const admin = req.user?._id;
  const { name, description, role } = req.body;

  const groupCode = await generateUniqueGroupCode();
  let roomData = {
    name,
    description,
    admin,
    groupCode,
  };

  if (role === "landlord") {
    roomData.landlord = admin;
  } else if (role === "tenant") {
    roomData.tenants = [admin];
  }

  const room = await Room.create(roomData);

  const createdRoom = await Room.findById(room._id);
  if (!createdRoom) {
    throw new ApiError(400, "Error creating room");
  }

  return res.json(
    new ApiResponse(201, createdRoom, "Room created successfully")
  );
});

const updateRoomCode = asyncHandler(async(req,res)=>{

})

const addUserRequest = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { groupCode,role } = req.body;

  const room = await Room.findOne({ groupCode });

  if (!room) {
    throw new ApiError(404, "Room doesn't exist");
  }

  if (room.pendingRequests.length > 50) {
    throw new ApiError(400, "Room has too many pending requests already");
  }

  if (
    !room.pendingRequests.some(
      (request) => request.userId.toString() === userId.toString()
    )
  ) {
    room.pendingRequests.push({ userId,role });
    await room.save();
  } else {
    return res.json(new ApiResponse(400, {}, "Request already sent"));
  }

  return res.json(new ApiResponse(200, {}, "Request sent successfully"));
});

const adminResponse = asyncHandler(async (req, res) => {
  const { roomId, userId, action } = req.body;

  const room = await Room.findById(roomId);

  const requestIndex = room.pendingRequests.findIndex(
    (request) => request.userId.toString() === userId
  );
  if (requestIndex === -1) {
    throw new ApiError(400, "No such pending request");
  }

  if (action === "approve") {
    room.members.push(userId);

    room.pendingRequests.splice(requestIndex, 1);

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (!user.rooms.includes(roomId)) {
      user.rooms.push(roomId);
      await user.save();
    }

    await room.save();
    return res.json(
      new ApiResponse(200, {}, "User approved and added to the room")
    );
  } else {
    room.pendingRequests.splice(requestIndex, 1);

    await room.save();

    return res.json(
      new ApiResponse(200, {}, "User denied and removed from pending requests")
    );
  }

});




export { createRoom, addUserRequest,adminResponse };
