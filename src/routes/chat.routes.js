import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
import { deleteMessage, getAllMessages, sendMessage } from "../controllers/chat.controller.js";


const router = Router();

router.use(verifyJWT)
router.route("/:chatId").get(getAllMessages).post(sendMessage)
router
  .route("/:chatId/:messageId")
  .delete(
    deleteMessage
  );
 
export default router;
