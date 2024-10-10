import { Router } from "express";
import { validate } from "../middleware/validator.middleware.js";
import { castVoteSchema, pollSchema } from "../zod/poll.schema.js";
import { checkMember } from "../middleware/poll.middleware.js";
import { castVote, createPoll } from "../controllers/poll.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/create-poll")
  .post(validate(pollSchema), verifyJWT, checkMember, createPoll);

router.route("/cast-vote").post(validate(castVoteSchema),verifyJWT, castVote);

export default router;
