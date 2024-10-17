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

const deleteMaintenance = asyncHandler(async (req, res) => {
  const { maintenanceId, roomId } = req.body;

  const room = await Room.findById(roomId);

  const maintenanceIndex = room.maintenance.findIndex(
    (item) => item._id.toString() === maintenanceId
  );

  if (maintenanceIndex === -1) {
    throw new ApiError(404, "Either room or maintenance is not find");
  }

  room.maintenance.splice(maintenanceIndex, 1);

  await room.save();

  return res.json(new ApiResponse(200, {}, "Maintenance deleted successfully"));
});

export { createMaintenance,deleteMaintenance };
