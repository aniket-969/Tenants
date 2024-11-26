import { z } from "zod";
import { objectIdValidation, stringValidation } from "./customValidator.js";

export const sendMessageSchema = z.object({
    
    content: stringValidation(1, 150, "content").optional(),
  
    attachments: z.array(
      z.object({
        url: z.string().url("Invalid URL format for attachment"), 
      })
    ).optional(), 
  });
