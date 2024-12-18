import { Room } from "../models/rooms.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { Poll } from "../models/poll.model.js";
import { Expense } from "../models/expense.model.js";

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

const updateRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { name, description } = req.body;

  const updatedRoom = await Room.findByIdAndUpdate(
    roomId,
    { $set: { name, description } },
    { new: true, runValidators: true }
  );

  if (!updatedRoom) {
    throw new ApiError(404, "Room not found");
  }

  return res.json(
    new ApiResponse(200, updatedRoom, "Room updated successfully")
  );
});

const addUserRequest = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { groupCode, role } = req.body;

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
    room.pendingRequests.push({ userId, role });
    await room.save();
  } else {
    return res.json(new ApiResponse(400, {}, "Request already sent"));
  }

  return res.json(new ApiResponse(200, {}, "Request sent successfully"));
});

const adminResponse = asyncHandler(async (req, res) => {
  const { roomId, requestId, action } = req.body;

  const room = await Room.findById(roomId);

  const requestIndex = room.pendingRequests.findIndex(
    (request) => request.id.toString() === requestId
  );
  if (requestIndex === -1) {
    throw new ApiError(400, "No such pending request");
  } 

  const { userId, role } = room.pendingRequests[requestIndex];

  if (action === "approve") {
    if (role === "landlord") {
      if (room.landlord) {
        throw new ApiError(400, "Room already has a landlord");
      }
      room.landlord = userId;
    } else if (role === "tenant") {
      room.tenants.push(userId);
    }

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

const deleteRoom = asyncHandler(async (req, res) => {
  const adminId = req.user?._id;
  const { roomId } = req.params;

  const room = await Room.findById(roomId);
  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  if (adminId.toString() !== room.admin.toString()) {
    throw new ApiError(403, "Only admin can delete rooms");
  }

  await room.remove();

  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "Room and related data deleted successfully")
    );
});

const getRoomData = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user?._id;
  const room = await Room.findById(roomId).select(
    "-groupCode -pendingRequests"
  );

  return res.json(new ApiResponse(200, room, "Room data fetched successfully"));
});

const leaveRoom = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { roomId } = req.params;

  const room = await Room.findById(roomId);

  room.tenants = room.tenants.filter(
    (tenant) => tenant.toString() !== userId.toString()
  );
  await room.save();

  user.rooms = user.rooms.filter((room) => room.toString() !== roomId);
  await user.save();

  return res.json(new ApiResponse(200, {}, "User has left the room"));
});

const transferAdminControl = asyncHandler(async (req, res) => {
    const { roomId, newAdminId } = req.body;
    const currentAdminId = req.user?._id;
  
    const room = await Room.findById(roomId);
  
    if (room.admin.toString() !== currentAdminId.toString()) {
      throw new ApiError(403, "Only the current admin can transfer admin rights");
    }
  
    if (!room.tenants.includes(newAdminId)) {
      throw new ApiError(400, "New admin must be a member of the room");
    }
  
    room.admin = newAdminId;
    await room.save();
  
    return res.status(200).json(new ApiResponse(200, room, "Admin rights transferred successfully"));
  });
 
export {
  createRoom,
  addUserRequest,
  adminResponse,
  updateRoom,
  deleteRoom,
  getRoomData,
  leaveRoom,
  transferAdminControl
};
