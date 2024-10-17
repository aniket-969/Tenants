import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Room } from "../models/rooms.model.js";

const createMaintenance = asyncHandler(async (req, res) => {
  const {
    roomId,
    title,
    description,
    maintenanceProvider,
    contactPhone,
    costEstimate,
  } = req.body;

  const room = await Room.findById(roomId);

  const maintenance = {
    title,
    description,
    maintenanceProvider,
    contactPhone,
    costEstimate,
  }; 

  room.maintenance.push(maintenance);
  await room.save();

  const newMaintenance = await room.maintenance[room.maintenance.length - 1];

  return res.json(
    new ApiResponse(
      200,
      newMaintenance,
      "Maintenance request created successfully"
    )
  );
});

export {createMaintenance}