import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: function () {
        return !this.isGuest;
      },
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: function () {
        return !this.isGuest;
      },
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: function () {
        return !this.isGuest;
      },
      trim: true,
      index: true,
    },

    avatar: {
      type: String,
      required: function () {
        return !this.isGuest;
      },
    },

    password: {
      type: String,
      required: function () {
        return !this.isGuest;
      },
    },

    role: {
      type: String,
      enum: ["guest", "tenant", "landlord"],
      default: "guest",
    },

    isGuest: {
      type: Boolean,
      default: true,
    },

    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
      avatar: this.avatar,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
  this.refreshToken = this.refreshToken;
  return this.refreshToken;
};

export const User = mongoose.model("User", userSchema);
