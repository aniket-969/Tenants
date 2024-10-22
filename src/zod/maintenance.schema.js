import {z} from "zod"
import { objectIdValidation,stringValidation } from './customValidator.js';

export const createMaintenanceSchema = z.object({
    roomId:objectIdValidation,
    title:stringValidation(1,20,"title"),
    description:stringValidation(1,100,"description"),
    maintenanceProvider:stringValidation(1,20,"maintenaceProvider").optional(),
    contactPhone:stringValidation(10,15,"contactPhone").regex(/^\+?[0-9]+$/, {
        message: 'Phone number must contain only digits and an optional leading + for international numbers.',
      }).optional(),
    costEstimate:z.number().min(1,{message:"Cost estimate should contain atleast 1 digit"}).max(10,{message:"Cost estimate can't exceed above 10 digits"}).optional(),
})

export const updateMaintenaceSchema = z.object({
    status:z.enum(["pending", "in_progress", "resolved", "cancelled"]).optional(),
    roomId:objectIdValidation,
    title:stringValidation(1,20,"title").optional(),
    description:stringValidation(1,100,"description").optional(),
    maintenanceProvider:stringValidation(1,20,"maintenaceProvider").optional(),
    contactPhone:stringValidation(10,15,"contactPhone").regex(/^\+?[0-9]+$/, {
        message: 'Phone number must contain only digits and an optional leading + for international numbers.',
      }).optional(),
    costEstimate:z.number().min(1,{message:"Cost estimate should contain atleast 1 digit"}).max(10,{message:"Cost estimate can't exceed above 10 digits"}).optional(),
    maintenanceId:objectIdValidation,
    dateResolved:z.string().date().optional(),
})