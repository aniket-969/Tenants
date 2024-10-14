import { AwardTemplate } from "../models/awards.model.js";
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

const createAwardTemplate = asyncHandler(async (req, res) => {
  const { title, description, image, criteria } = req.body;

  const awardTemplate = await AwardTemplate.create({
    title,
    description,
    image,
    criteria,
  });

  return res.json(
    new ApiResponse(201, awardTemplate, "Award template created successfully")
  );
});

const createCustomAward = asyncHandler(async (req, res) => {
  const { title, description, image, criteria } = req.body;

  const isAuthorized = await checkRoomAdmin(req.user._id, req.body.roomId);
  if (!isAuthorized) {
    throw new ApiError(403, "Only room admins can create custom awards");
  }

  const awardTemplate = await AwardTemplate.create({
    title,
    description,
    image,
    criteria,
  });

  return res.json(
    new ApiResponse(
      201,
      awardTemplate,
      "Custom award template created successfully"
    )
  );
});

export { getRoomAwards, createAwardTemplate, createCustomAward };