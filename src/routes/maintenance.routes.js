
import { Router } from 'express';
import { createMaintenance } from '../controllers/maintenance.controller.js';
const router = Router()

router.route("/maintenance").post(createMaintenance)

export default router