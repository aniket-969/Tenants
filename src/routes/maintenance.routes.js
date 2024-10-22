import { Router } from "express";
import { createMaintenance, deleteMaintenance, updateMaintenance } from "../controllers/maintenance.controller.js";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import { checkMember } from "../middleware/poll.middleware.js";
import { validate } from './../middleware/validator.middleware.js';
import { createMaintenanceSchema, updateMaintenaceSchema } from "../zod/maintenance.schema.js";
const router = Router();

router.route("/create").post(verifyJWT,validate(createMaintenanceSchema), checkMember, createMaintenance);
router.route("/delete").delete(verifyJWT, checkMember, deleteMaintenance);
router.route("/update").patch(verifyJWT,validate(updateMaintenaceSchema), checkMember, updateMaintenance);

export default router;
