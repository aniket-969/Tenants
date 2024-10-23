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
router.route("/delete").delete(verifyJWT, checkMember, deleteRoomAward);
router.route("/update").patch(verifyJWT, checkMember, updateRoomAward);
 
export default router;
