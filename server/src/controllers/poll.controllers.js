import { asyncHandler } from "../utils/asyncHandler.js";
import { Poll } from "../models/poll.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { Room } from "../models/rooms.model.js";

const hasUserVoted = (poll, userId) => {
  return poll.options.some((option) =>
    option.votes.some((vote) => vote.voter.toString() === userId.toString())
  );
};
const createPoll = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { title, status, voteEndTime, options } = req.body; // Use 'options' from the updated schema
  const createdBy = req.user?._id;

  // Map the options array to the required format
  const formattedOptions = options.map((text) => ({
    optionText: text,
    votes: [],
  }));

  const poll = await Poll.create({
    createdBy,
    title,
    status,
    voteEndTime,
    room: roomId,
    options: formattedOptions, // Save the formatted options
  });

  return res.json(new ApiResponse(201, poll, "Poll created successfully"));
});

const castVote = asyncHandler(async (req, res) => {
  const { pollId, optionId } = req.params;
  const userId = req.user?._id;

  const poll = await Poll.findById(pollId);
  if (!poll) throw new ApiError(404, "Poll not found");

  if (new Date() > new Date(poll.voteEndTime)) {
    throw new ApiError(400, "Voting has ended for this poll");
  }

  const room = await isRoomMember(poll.room, userId);

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

const updatePoll = asyncHandler(async (req, res) => {
  const { pollId } = req.params;
  const { title, options } = req.body;

  const poll = await Poll.findById(pollId);
  if (!poll) throw new ApiError(404, "Poll not found");

  if (poll.status !== "active") {
    throw new ApiError(400, "Cannot update a completed or closed poll");
  }

  poll.title = title || poll.title;
  poll.options = options || poll.options;

  await poll.save();

  return res.json(new ApiResponse(200, poll, "Poll updated successfully"));
});

const getRoomPolls = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { status } = req.query;

  const filters = { room: roomId };
  if (status) {
    filters.status = status;
  }

  const polls = await Poll.find(filters).populate({
    path: "options.votes.voter",
    select: "username avatar",
  });

  if (!polls.length) throw new ApiError(404, "No polls found for this room");

  const formattedPolls = polls.map((poll) => {
    return {
      title: poll.title,
      status: poll.status,
      voteEndTime: poll.voteEndTime,
      options: poll.options.map((option) => ({
        optionText: option.optionText,
        voteCount: option.votes.length,
        voters: option.votes.map((vote) => ({
          username: vote.voter.username,
          avatar: vote.voter.avatar,
        })),
        userVote: option.votes.some(
          (vote) => vote.voter._id.toString() === req.user._id.toString()
        ),
      })),
    };
  });

  return res.json(
    new ApiResponse(200, formattedPolls, "Room polls fetched successfully")
  );
});

const deletePoll = asyncHandler(async (req, res) => {
  const { pollId } = req.params;
  const poll = await Poll.findByIdAndDelete(pollId);

  if (!poll) throw new ApiError(404, "Poll not found");
  return res.json(new ApiResponse(200, {}, "Poll deleted successfully"));
});

export { createPoll, castVote, updatePoll, getRoomPolls, deletePoll };
