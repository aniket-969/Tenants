import { Router } from "express";
import { createMaintenance } from "../controllers/maintenance.controller.js";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import { checkMember } from "../middleware/poll.middleware.js";
const router = Router();

router.route("/maintenance").post(verifyJWT, checkMember, createMaintenance);

export default router;
