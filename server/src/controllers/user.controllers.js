import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  //   console.log(accessToken, refreshToken);
  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  console.log("this is body", req.body);
  const { username, email, fullName, avatar, password } = req.body;

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
  //   console.log("existed", existedUser);
  const isPasswordValid = await existedUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(existedUser._id);

  const loggedInUser = await User.findById(existedUser._id).select(
    "username avatar email fullName"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unidentified user");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshTokens = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }
  console.log(req.body, incomingRefreshToken);
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh token is expired or used");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, refreshToken } = await generateTokens(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "User Token updated successfully"
      )
    );
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  console.log("this is request", req);
  const { fullName, username, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        username,
        avatar,
      },
    },
    { new: true }
  ).select("username email fullName avatar");
  console.log("this is user", user);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const fetchSession = asyncHandler(async (req, res) => {
  const user = user.findById(req.user?._id).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(401, "Session not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Session retrieved successfully"));
});

const addPaymentMethod = asyncHandler(async (req, res) => {
  const userId  = req.user?._id;
  const { paymentMethod } = req.body;
  // Find the user by ID
  const user = await User.findById(userId);
if(!user) throw new ApiError(400,"can't find the user")
  // Add each payment method to the user's paymentMethod array

  paymentMethod.forEach((method) => {
    //  check if the payment method already exists for the user (optional check)
    console.log("re");

   const paymentMethodExists = user.paymentMethod.some(
      (existingMethod) =>
        existingMethod.appName === method.appName &&
        existingMethod.type === method.type
    );

    if (paymentMethodExists) {
      return; // Skip adding this method if it already exists
    }
    console.log("sfad");
    user.paymentMethod.push(method);
  });

  // Save the updated user document
  await user.save();

  res.status(201).json({
    message: "Payment methods added successfully",
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokens,
  changePassword,
  updateAccountDetails,
  fetchSession,
  addPaymentMethod,
};
