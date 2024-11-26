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
import { checkMember } from "../middleware/poll.middleware.js";

const router = Router();

router
  .route("/create") 
  .post(verifyJWT, validate(createCalendarEventSchema), createCalendarEvent);
router.route("/:eventId").delete(verifyJWT,checkMember, deleteCalendarEvent);
router.route("/:roomId").get(verifyJWT,checkMember, getRoomCalendarEvent);
router.route("/:eventId").get(verifyJWT,checkMember,getSingleEvent)
router.route("/room/:roomId/events/monthly").get(verifyJWT,checkMember,getMonthlyEvents)
 
export default router;
