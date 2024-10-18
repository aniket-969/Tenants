import { Router } from "express";
import { addUserRequest, adminResponse, createRoom } from "../controllers/room.controller.js";
const router = Router();
router.route("/create").post(createRoom);
router.route("/request").post(addUserRequest);
router.route("/response").post(adminResponse);

export default router;
