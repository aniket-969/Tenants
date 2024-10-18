import { Room } from "../models/rooms.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";

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

const addUserRequest = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { groupCode } = req.body;
  
  const room = await Room.findOne({groupCode})

  if(!room){
    throw new ApiError(404,"Room doesn't exist")
  }

  if(room.pendingRequests.length>50){
    throw new ApiError(400,"Room has too many pending requests already")
  }

  if (!room.pendingRequests.some(request => request.userId.toString() === userId.toString())) {
    room.pendingRequests.push({ userId });
    await room.save();
  } 
  
  else {
    return res.json(new ApiResponse(400, {}, "Request already sent"));
  }

  return res.json(new ApiResponse(200,{},"Request sent successfully"))

});

export { createRoom,addUserRequest };
