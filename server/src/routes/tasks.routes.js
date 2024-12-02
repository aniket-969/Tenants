import { Router } from "express";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import { checkMember } from "../middleware/poll.middleware.js";
import { createRoomTaskSchema, updateRoomTaskSchema } from "../zod/tasks.schema.js";
import { validate } from "../middleware/validator.middleware.js"; 
import{
  createRoomTask,
  createSwitchRequest, 
  deleteRoomTask,
  switchRequestResponse,
  updateRoomTask,
} from "../controllers/tasks.controller.js";

const router = Router();
 
router.route("/:roomId").post(verifyJWT,validate(createRoomTaskSchema), checkMember, createRoomTask);
router.route("/:taskId/:roomId").patch(verifyJWT,validate(updateRoomTaskSchema), checkMember, updateRoomTask);
router.route("/:taskId/:roomId").delete(verifyJWT, checkMember, deleteRoomTask);
router.route("/taskSwitch/:taskId/:roomId").post(verifyJWT, checkMember, createSwitchRequest);
router
  .route("/taskSwitchResponse/:taskId/:roomId")
  .post(verifyJWT, checkMember, switchRequestResponse);

export default router;
