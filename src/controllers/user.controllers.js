import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const registerUser = asyncHandler(async(req,res)=>{
    res.status(200).json(new ApiResponse(200,"User registered successfully"))
})

