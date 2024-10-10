import { Router } from "express";
import { getRoomAwards } from "../controllers/awards.controller.js";

const router = Router()

router.route("/roomAwards",getRoomAwards)

export default router