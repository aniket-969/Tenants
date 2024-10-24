import { Router } from "express";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import { checkMember } from "../middleware/poll.middleware.js";
import {
  createRoomTask,
  createSwitchRequest,
  deleteRoomTask,
  switchRequestResponse,
  updateRoomTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, checkMember, createRoomTask);
router.route("/update").patch(verifyJWT, checkMember, updateRoomTask);
router.route("/delete").delete(verifyJWT, checkMember, deleteRoomTask);
router.route("/taskSwitch").post(verifyJWT, checkMember, createSwitchRequest);
router
  .route("/taskSwitchResponse")
  .post(verifyJWT, checkMember, switchRequestResponse);

export default router;
