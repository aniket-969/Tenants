import { Room } from "../models/rooms.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const customRoomAward = asyncHandler(async (req, res) => {
  const { roomId, title, description, image, criteria, assignedTo } = req.body;

  const room = await Room.findById(roomId);

  const award = {
    title,
    description,
    image,
    criteria,
    assignedTo,
  };

  room.awards.push(award);
  await room.save();

  const newAward = room.awards[room.awards.length - 1];

  return res.json(
    new ApiResponse(200, newAward, "Custom award created successfully")
  );
});

const deleteRoomAward = asyncHandler(async (req, res) => {
  const { roomId, awardId } = req.body;

  const room = await Room.findById(roomId);

  const awardIndex = room.awards.findIndex(
    (item) => item._id.toString() === awardId
  );

  if (awardIndex === -1) {
    throw new ApiError(404, "Award not find");
  }

  room.awards.splice(awardIndex, 1);
  await room.save();
  return res.json(new ApiResponse(200, {}, "Awards deleted successfully"));
});

const updateRoomAward = asyncHandler(async (req, res) => {
  const { roomId, awardId, title, description, image, criteria, assignedTo } =
    req.body;

  const updateAward =await Room.findOneAndUpdate(
    { _id: roomId, "awards._id": awardId },
    {
      $set: {
        "awards.$.title": title,
        "awards.$.description": description,
        "awards.$.assignedTo": assignedTo,
        "awards.$.criteria": criteria,
        "awards.$.image": image,
      },
    },
    { new: true, runValidators: true }
  );

  if (!updateAward) {
    throw new ApiError(404, "Error updating awards");
  }

  const updatedAward = updateAward.awards.id(awardId);

  return res.json(
    new ApiResponse(200, updateAward, "Award updated successfully")
  );
});

export { customRoomAward, deleteRoomAward ,updateRoomAward};
