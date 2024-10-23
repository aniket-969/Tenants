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

router.route("/create").post(verifyJWT, validate(createCustomAwardSchema),checkMember, customRoomAward);
router.route("/delete").delete(verifyJWT, checkMember, deleteRoomAward);
router.route("/update").patch(verifyJWT,validate(updateAwardSchema), checkMember, updateRoomAward);
 
export default router;
