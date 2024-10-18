import { Router } from "express";
import { addUserRequest, adminResponse, createRoom, updateRoom } from "../controllers/room.controller.js";
const router = Router();
router.route("/create").post(createRoom);
router.route("/request").post(addUserRequest);
router.route("/response").post(adminResponse);
router.route("/update/:roomId").patch(updateRoom);
router.route("/delete/:roomId").delete(updateRoom);

export default router;
