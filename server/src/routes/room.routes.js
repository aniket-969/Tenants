import { Router } from "express";
import { addUserRequest, adminResponse, createRoom, deleteRoom, getRoomData, transferAdminControl, updateRoom } from "../controllers/room.controller.js";
import { verifyJWT } from './../middleware/auth.middleware.js';
import { checkMember } from "../middleware/poll.middleware.js";
import { addUserRequestSchema, adminResponseSchema, creatRoomSchema, transferRoleSchema } from "../zod/room.schema.js";
import { validate } from './../middleware/validator.middleware.js';
 
const router = Router();

router.route("/").post(verifyJWT,validate(creatRoomSchema),createRoom);
router.route("/:roomId/requests").post(verifyJWT,validate(addUserRequestSchema),addUserRequest);
router.route("/:roomId/responses").post(verifyJWT,validate(adminResponseSchema),adminResponse);
router.route("/:roomId").patch(verifyJWT,updateRoom);
router.route("/:roomId").delete(verifyJWT,deleteRoom);
router.route("/:roomId").get(verifyJWT,checkMember,getRoomData);
router.route("/:roomId/leave").patch(verifyJWT,checkMember,getRoomData);
router.route("/:roomId/admin/transfer").post(verifyJWT,validate(transferRoleSchema),checkMember,transferAdminControl);

export default router;
