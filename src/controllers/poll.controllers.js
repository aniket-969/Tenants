import { asyncHandler } from "../utils/asyncHandler.js";
import { Poll } from "../models/poll.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { Room } from "../models/rooms.model.js";

const isRoomMember = async (roomId, userId) => {
  const room = await Room.findById(roomId);
  if (!room) throw new ApiError(404, "Room not found");

  const isMember =
    room.tenants.some((tenant) => tenant.equals(userId)) ||
    room.landlord.equals(userId);

  if (!isMember) throw new ApiError(403, "User is not a member of this room");

  return room; // Return the room document
};

const hasUserVoted = (poll, userId) => {
  return poll.options.some((option) =>
    option.votes.some((vote) => vote.voter.toString() === userId.toString())
  );
};

const createPoll = asyncHandler(async (req, res) => {
  const { title, roomId, status, voteEndTime, optionText } = req.body;
  const createdBy = req.user?._id;

  const options = optionText.map((text) => ({
    optionText: text,
    votes: [],
  }));

  const poll = await Poll.create({
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

  const poll = await Poll.findById(pollId);
  if (!poll) throw new ApiError(404, "Poll not found");

  if (new Date() > new Date(poll.voteEndTime)) {
    throw new ApiError(400, "Voting has ended for this poll");
  }

  // Now we use the room object returned by isRoomMember
  const room = await isRoomMember(poll.roomId, userId);

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

const getPollResults = asyncHandler(async (req, res) => {
  const { pollId } = req.params;
  const poll = await Poll.findById(pollId);

  if (poll.status != "completed")
    throw new ApiError(404, "Poll is still active or closed");

  if (!poll) throw new ApiError(404, "Poll not found");
  return res.json(
    new ApiResponse(200, poll.options, "Poll results retrieved successfully")
  );
});

export { createPoll, castVote };
