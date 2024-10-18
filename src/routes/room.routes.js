import { Router } from "express";
import { addUserRequest, adminResponse, createRoom, deleteRoom, getRoomData, updateRoom } from "../controllers/room.controller.js";
import { verifyJWT } from './../middleware/auth.middleware.js';
import { checkMember } from "../middleware/poll.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT,createRoom);
router.route("/request").post(verifyJWT,addUserRequest);
router.route("/response").post(verifyJWT,adminResponse);
router.route("/update/:roomId").patch(verifyJWT,updateRoom);
router.route("/delete/:roomId").delete(verifyJWT,deleteRoom);
router.route("/:roomId").get(verifyJWT,checkMember,getRoomData);

export default router;
