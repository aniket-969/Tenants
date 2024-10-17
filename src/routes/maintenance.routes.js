import { Router } from "express";
import { createMaintenance, deleteMaintenance, updateMaintenance } from "../controllers/maintenance.controller.js";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import { checkMember } from "../middleware/poll.middleware.js";
const router = Router();

router.route("/maintenance").post(verifyJWT, checkMember, createMaintenance);
router.route("/maintenance").delete(verifyJWT, checkMember, deleteMaintenance);
router.route("/maintenance").patch(verifyJWT, checkMember, updateMaintenance);

export default router;
