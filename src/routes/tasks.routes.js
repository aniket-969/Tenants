import { Router } from 'express';
import { verifyJWT } from './../middleware/auth.middleware.js';
import { checkMember } from '../middleware/poll.middleware.js';
import { createRoomTasks } from '../controllers/tasks.controller.js';

const router = Router()

router.route("/task").post(verifyJWT,checkMember,createRoomTasks)

export default router