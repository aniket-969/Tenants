import { Router } from "express";
import { addUserRequest, adminResponse, createRoom, deleteRoom, getRoomData, transferAdminControl, updateRoom } from "../controllers/room.controller.js";
import { verifyJWT } from './../middleware/auth.middleware.js';
import { checkMember } from "../middleware/poll.middleware.js";
import { addUserRequestSchema, adminResponseSchema, creatRoomSchema } from "../zod/room.schema.js";
import { validate } from './../middleware/validator.middleware.js';

const router = Router();

router.route("/create").post(verifyJWT,validate(creatRoomSchema),createRoom);
router.route("/request").post(verifyJWT,validate(addUserRequestSchema),addUserRequest);
router.route("/response").post(verifyJWT,validate(adminResponseSchema),adminResponse);
router.route("/update/:roomId").patch(verifyJWT,updateRoom);
router.route("/delete/:roomId").delete(verifyJWT,deleteRoom);
router.route("/:roomId").get(verifyJWT,checkMember,getRoomData);
router.route("/leave/:roomId").patch(verifyJWT,checkMember,getRoomData);
router.route("/admin/tranfer").post(verifyJWT,checkMember,transferAdminControl);

export default router;
