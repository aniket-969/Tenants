import { Room } from "../models/rooms.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getRoomAwards = asyncHandler(async(req,res)=>{
   const {roomId} = req.params

   const room = await Room.findById(roomId).populate('tenants landlord')
   const roomUsers = [...room.tenants,room.landlord]

   const awards = await Award.find({
    awardedTo:{$in:roomUsers},
   })

   if(!awards.length){
    throw new ApiError(404,"No awards found")
   }
   return res.json(new ApiResponse(200,awards,"Room awards fetched successfully"))
})

export {getRoomAwards}
