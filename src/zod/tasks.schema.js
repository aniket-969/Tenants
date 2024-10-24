import {z} from "zod"
import { objectIdValidation,stringValidation } from './customValidator.js';

export const createRoomTaskSchema = z.object({
    title:stringValidation(1,20,"title"),
    description:stringValidation(5,50,"description").optional(),
    currentAssignee:objectIdValidation,
    dueDate:z.string().date().optional(),
    participants:z.array(objectIdValidation),
    rotationOrder:stringValidation(1,20,"rotationOrder").optional(),
    completed:z.boolean().optional(),
    priority:z.enum(["low", "medium", "high"]).optional(),
    recurring:z.boolean().optional(),
    recurrencePattern:stringValidation(1,20,"recurrence pattern").optional(),
    customRecurrence:stringValidation(1,20,"custom recurrence").optional(),
})