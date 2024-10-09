import { Router } from "express";
import { validate } from "../middleware/validator.middleware.js";
import { voteSchema } from "../zod/vote.schema.js";

const router = Router()

router.route("/create-vote").post(validate(voteSchema))

export default router