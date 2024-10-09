import { Router } from "express";
import { registerSchema } from "./../zod/user.schema.js";
import { validate } from "../middleware/validator.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(validate(registerSchema), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
