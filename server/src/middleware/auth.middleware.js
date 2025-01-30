import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer", "");
  // console.log("cookies", req.cookies);
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }
  
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // console.log("decodedToken", decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    throw new ApiError(401, "Token has expired");
  }
  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken -rooms"
  );
  // console.log("jwt verification", user);

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  req.user = user;
  next();
});
 