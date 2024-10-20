import { Router } from "express";
import {
  customRoomAward,
  deleteRoomAward,
  updateRoomAward,
} from "../controllers/awards.controller.js";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import { checkMember } from "../middleware/poll.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, checkMember, customRoomAward);
router.route("/create").delete(verifyJWT, checkMember, deleteRoomAward);
router.route("/create").patch(verifyJWT, checkMember, updateRoomAward);

export default router;
