import { Router } from "express";
import { validate } from "../middleware/validator.middleware.js";
import { castVoteSchema, pollSchema } from "../zod/poll.schema.js";
import { checkMember } from "../middleware/room.middleware.js";
import {
  castVote,
  createPoll,
  deletePoll,
  getRoomPolls,
  updatePoll,
} from "../controllers/poll.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
// Polls within a room
router.route("/:roomId/polls").post(validate(pollSchema), verifyJWT, checkMember, createPoll);
router.route("/:roomId/polls").get(verifyJWT, getRoomPolls);

// Specific poll actions
router.route("/:pollId").patch(verifyJWT, updatePoll);
router.route("/:pollId").delete(verifyJWT, deletePoll);

// Voting on a poll option
router.route("/:pollId/vote/:optionId").post(validate(castVoteSchema), verifyJWT, castVote);


router.route("/:pollId").delete(verifyJWT, deletePoll);

export default router;
