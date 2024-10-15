import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
import { createCalendarEventSchema } from "../zod/calendarEvent.schema.js";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getMonthlyEvents,
  getRoomCalendarEvent,
  getSingleEvent,
} from "../controllers/event.controller.js";

const router = Router();

router
  .route("/create-event")
  .post(verifyJWT, validate(createCalendarEventSchema), createCalendarEvent);
router.route("/:eventId").delete(verifyJWT, deleteCalendarEvent);
router.route("/events").get(verifyJWT, getRoomCalendarEvent);
router.route("/:eventId").get(verifyJWT,getSingleEvent)
router.route("/room/:roomId/events/monthly").get(getMonthlyEvents)

export default router;
