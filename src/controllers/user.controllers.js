import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log("this is body", req.body);
  const { username, email, fullName, avatar, password, room } = req.body;

  const existedUser = await User.findOne({
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

  return res.json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { identifier, password } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
  if (!existedUser) {
    throw new ApiError(409, "User not found");
  }
  console.log("existed", existedUser);
  const isPasswordValid = await existedUser.isPasswordCorrect(password);
  console.log("pass", isPasswordValid);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const loggedInUser = await User.findById(existedUser._id).select(
    "username avatar email fullName"
  );
  console.log("Log", loggedInUser);
  return res.json(
    new ApiResponse(200, loggedInUser, "User logged in successfully")
  );
});

export { registerUser, loginUser };
