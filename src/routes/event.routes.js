import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
import { createCalendarEventSchema } from "../zod/calendarEvent.schema.js";
import { createCalendarEvent } from "../controllers/event.controller.js";

const router = Router()

router.route("/create-event").post(verifyJWT,validate(createCalendarEventSchema),createCalendarEvent)

export default router