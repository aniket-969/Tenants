import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
import { createCalendarEventSchema } from "../zod/calendarEvent.schema.js";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getRoomCalendarEvent,
} from "../controllers/event.controller.js";

const router = Router();

router
  .route("/create-event")
  .post(verifyJWT, validate(createCalendarEventSchema), createCalendarEvent);
router.route("/:eventId").delete(verifyJWT, deleteCalendarEvent);
router.route("/events").get(verifyJWT, getRoomCalendarEvent);

export default router;
