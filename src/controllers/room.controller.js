import { Room } from "../models/rooms.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createRoom = asyncHandler(async (req, res) => {
  const admin = req.user?._id;
  const { name, password, description, role } = req.body;

  let roomData = {
    name,
    password,
    description,
    admin,
  };

  if (role === "landlord") {
    roomData.landlord = admin;
  } else if (role === "tenant") {
    roomData.tenants = [admin];
  }

  const room = await Room.create(roomData);

  const createdRoom = await Room.findById(room._id).select("-password");
  if (!createdRoom) {
    throw new ApiError(400, "Error creating room");
  }

  return res.json(
    new ApiResponse(201, createdRoom, "Room created successfully")
  );
});

const addUser = asyncHandler(async (req, res) => {
  const { roomId,password } = req.body;
  

});

export { createRoom };
