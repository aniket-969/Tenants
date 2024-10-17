import { Router } from "express";
import {
  customRoomAward,
  getRoomAwards,
} from "../controllers/awards.controller.js";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import { checkMember } from "../middleware/poll.middleware.js";

const router = Router();

router.route("/roomAwards", getRoomAwards);
router.route("/roomAwards").post(verifyJWT, checkMember, customRoomAward);

export default router;
