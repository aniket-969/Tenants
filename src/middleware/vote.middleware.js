import { asyncHandler } from "../utils/asyncHandler";
import Room from "../models/rooms.model"
import { ApiError } from "../utils/ApiError";

const checkMember = asyncHandler(async(req,res)=>{
    const {roomId, createdBy} = req.body
     
    const room = await Room.findById(roomId)
    if(!room) throw new ApiError(404,"Room not found")

        const isMember = room.tenants.includes(createdBy) || room.landlord.toString() === createdBy;

        if(!isMember) throw new ApiError(403,"Unauthorized member")

            next()
})

export {checkMember}