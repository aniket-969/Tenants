import { Router } from "express";
import { validate } from "../middleware/validator.middleware.js";
import { pollSchema } from "../zod/poll.schema.js";
import { checkMember } from "../middleware/poll.middleware.js";
import { castVote, createPoll } from "../controllers/poll.controllers.js";

const router = Router()

router.route("/create-poll").post(validate(pollSchema),checkMember,createPoll)

router.route("/cast-vote").post(castVote)

export default router
