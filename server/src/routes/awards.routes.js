import { Router } from "express";
import {
  customRoomAward,
  deleteRoomAward,
  getRoomAwards,
  updateRoomAward,
} from "../controllers/awards.controller.js";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import { checkMember } from "../middleware/room.middleware.js";
import { validate } from './../middleware/validator.middleware.js';
import { createCustomAwardSchema, updateAwardSchema } from "../zod/awards.schema.js";

const router = Router();
 
router.use(verifyJWT)
router.route("/:roomId").post( validate(createCustomAwardSchema),checkMember, customRoomAward).get(checkMember,getRoomAwards);

router.route("/:roomId/:awardId").delete( checkMember, deleteRoomAward);
router.route("/:roomId/:awardId").patch(validate(updateAwardSchema), checkMember, updateRoomAward);
 
export default router;
