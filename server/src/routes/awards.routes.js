import { Router } from "express";
import {
  customRoomAward,
  deleteRoomAward,
  updateRoomAward,
} from "../controllers/awards.controller.js";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import { checkMember } from "../middleware/poll.middleware.js";
import { validate } from './../middleware/validator.middleware.js';
import { createCustomAwardSchema, updateAwardSchema } from "../zod/awards.schema.js";

const router = Router();

router.route("/roomId").post(verifyJWT, validate(createCustomAwardSchema),checkMember, customRoomAward);
router.route("/roomId/awardId").delete(verifyJWT, checkMember, deleteRoomAward);
router.route("/roomId/awardId").patch(verifyJWT,validate(updateAwardSchema), checkMember, updateRoomAward);
 
export default router;
