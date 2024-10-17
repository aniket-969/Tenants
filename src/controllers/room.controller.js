import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createRoom = asyncHandler(async(req,res)=>{
    const admin = req.user?._id
    const {password} = req.body
    
})