import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log("this is body", req.body);
  const { isGuest, username, email, fullName, avatar, password, room } =
    req.body;

  if (isGuest) {
    if (!room) {
      throw new ApiError(400, "Room is required to create a guest account");
    }
    const user = await User.create({
      isGuest: true,
      role: "guest",
    });
    const createdUser = await User.findById(user._id);
    return res.json(
      new ApiResponse(200, createdUser, "Guest user created successfully")
    );
  }

  const existedUser = await user.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    username,
    fullName,
    email,
    password,
    avatar,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  return res.json(new ApiResponse(200, "User registered successfully"));
});

export { registerUser };
