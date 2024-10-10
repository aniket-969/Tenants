import { Router } from "express";
import { validate } from "../middleware/validator.middleware.js";
import { pollSchema } from "../zod/poll.schema.js";
import { checkMember } from "../middleware/poll.middleware.js";
import { createPoll } from "../controllers/poll.controllers.js";

const router = Router()

router.route("/create-vote").post(validate(pollSchema),checkMember,createPoll)

export default router