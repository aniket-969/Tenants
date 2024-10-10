import { asyncHandler } from "../utils/asyncHandler.js";
import { Poll } from "../models/poll.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPoll = asyncHandler(async (req, res) => {
  const { title, roomId, status, voteEndTime, optionText } = req.body;
  const createdBy = req.user?._id;

  const options = optionText.map((text) => ({
    optionText: text,
    votes: [],
  }));

  const poll = Poll.create({
    createdBy,
    title,
    status,
    voteEndTime,
    roomId,
    options,
  });

  return res.json(new ApiResponse(201, poll, "Poll created successfully"));
});

export { createPoll };
