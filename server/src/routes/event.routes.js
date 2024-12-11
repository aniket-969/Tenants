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
import { checkMember } from "../middleware/room.middleware.js";

const router = Router();

router.use(verifyJWT);
router.route("/room/:roomId/monthly").get(checkMember, getMonthlyEvents);
router.route("/room/:roomId").get(checkMember, getRoomCalendarEvent);
router
  .route("/:roomId/:eventId")
  .delete(checkMember, deleteCalendarEvent)
  .get(checkMember, getSingleEvent);
router
  .route("/:roomId")
  .post(validate(createCalendarEventSchema), checkMember, createCalendarEvent);
 

export default router;
