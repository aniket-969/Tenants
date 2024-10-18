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
    groupCode
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

const addUser = asyncHandler(async (req, res) => {
  const { roomId, password } = req.body;
});

export { createRoom };
