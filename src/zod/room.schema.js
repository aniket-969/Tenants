import { z } from "zod";
import { objectIdValidation, stringValidation } from "./customValidator.js";

export const creatRoomSchema = z.object({
    name:stringValidation(1,20,"name"),
    description:stringValidation(1,20,"description").optional(),
    role:z.enum(["tenant","landlord"])
})

