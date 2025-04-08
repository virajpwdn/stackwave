const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is Required"],
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      uniue: [true, "username already exists! try something different"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [
        true,
        "email already exists! you are already a user, please try log in",
      ],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default:
        "https://imgs.search.brave.com/s4CC8oBjuIPVospzk8SUACobvEdC-lTW92rNGReh2aQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzg5LzkzLzI3/LzM2MF9GXzU4OTkz/Mjc4Ml92UUFFQVpo/SG5xMVFDR3U1aWt3/cllhUUQwTW11cm0w/Ti5qcGc",
    },
    reputation: {
      type: String,
      default: "bronze",
    },
    role: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    provider: {
      type: String,
      default: "Local",
    },
    tags: [
      {
        type: String,
      },
    ],
    badges: [
      {
        type: String,
      },
    ],
    answers: {
      type: Number,
    },
    questions: {
      type: Number,
    },
    upVotes: {
      type: Number,
    },
    downVotes: {
      type: Number,
    },
    isTourComplete: {
      type: Boolean,
    },
    emailVerified: {
      type: Boolean,
    },
    isBlocked: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);