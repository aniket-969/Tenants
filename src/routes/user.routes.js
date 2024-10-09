import { Router } from "express";
import { loginSchema, registerSchema } from "./../zod/user.schema.js";
import { validate } from "../middleware/validator.middleware.js";
import {
  changePassword,
  loginUser,
  logoutUser,
  refreshTokens,
  registerUser,
  updateAccountDetails,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(validate(registerSchema), registerUser);
router.route("/login").post(validate(loginSchema), loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refreshTokens").post(verifyJWT, refreshTokens);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/update-user").patch(verifyJWT, updateAccountDetails);

export default router;
