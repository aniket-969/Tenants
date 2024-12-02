import { Router } from "express";
import { validate } from "../middleware/validator.middleware.js";
import { castVoteSchema, pollSchema } from "../zod/poll.schema.js";
import { checkMember } from "../middleware/poll.middleware.js";
import { castVote, createPoll, deletePoll, getRoomPolls, updatePoll } from "../controllers/poll.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/:roomId")
  .post(validate(pollSchema), verifyJWT, checkMember, createPoll);

router.route("/cast-vote/:pollId/:optionId").post(validate(castVoteSchema), verifyJWT, castVote);

router.route("/:pollId").patch(verifyJWT, updatePoll);

router.route("/:roomId").get(verifyJWT, getRoomPolls);

router.route("/:pollId").delete(verifyJWT, deletePoll);

export default router;
