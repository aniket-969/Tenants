import {z} from "zod"
import { objectIdValidation,stringValidation } from './customValidator.js';

export const createMaintenanceSchema = z.object({
    title:stringValidation(1,20,"title"),
    description:stringValidation(1,100,"description").optional(),
    maintenanceProvider:stringValidation(1,20,"maintenaceProvider").optional(),
    contactPhone:stringValidation(10,15,"contactPhone").regex(/^\+?[0-9]+$/, {
        message: 'Phone number must contain only digits and an optional leading + for international numbers.',
      }).optional(),
    costEstimate:z.number().min(1,{message:"Cost estimate should contain atleast 1 digit"}).max(10000000,{message:"Cost estimate can't exceed above 10^8 digits"}).optional(),
})

export const updateMaintenaceSchema = z.object({
    status:z.enum(["pending", "in_progress", "resolved", "cancelled"]).optional(),
    title:stringValidation(1,20,"title").optional(),
    description:stringValidation(1,100,"description").optional(),
    maintenanceProvider:stringValidation(1,20,"maintenaceProvider").optional(),
    contactPhone:stringValidation(10,15,"contactPhone").regex(/^\+?[0-9]+$/, {
        message: 'Phone number must contain only digits and an optional leading + for international numbers.',
      }).optional(),
    costEstimate:z.number().min(1,{message:"Cost estimate should contain atleast 1 digit"}).max(10000000,{message:"Cost estimate can't exceed above 10^8 digits"}).optional(),
    dateResolved:z.string().transform((val) => new Date(val)).refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }).optional(),
})