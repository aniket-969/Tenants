import { asyncHandler } from "../utils/asyncHandler.js";
import { Poll } from "../models/poll.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

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

const castVote = asyncHandler(async (req, res) => {
  const { pollId, optionId } = req.body;
  const userId = req.user?._id;
  const poll = Poll.findById(pollId);
  if (!poll) return new ApiError(404, "Poll not found");
  if (new Date() > new Date(poll.voteEndTime)) {
    throw new ApiError(400, "Voting has ended for this poll");
  }

  const userHasVoted = poll.options.some((option) =>
    option.votes.some((vote) => vote.voter.toString() === userId.toString())
  );

  if (userHasVoted) throw new ApiError(400, "User already have voted");

  const option = poll.options.id(optionId);
  if (!option) {
    throw new ApiError(404, "Option not found");
  }

  option.votes.push({ voter: mongoose.Types.ObjectId(userId) });

  await poll.save();
  return res.json(new ApiResponse(200, poll, "Vote cast successfully"));
});

export { createPoll, castVote };
