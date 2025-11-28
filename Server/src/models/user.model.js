const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is Required"],
    },
    role:{
      type: String,
      default: "user"
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
      unique: [true],
    },
    password: {
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
    // role: {
    //   type: String,
    // },
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
        // TODO add a default badge that should be bronze
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

userSchema.statics.hashPassword = async function (password) {
  if (!password) throw new Error("Password is required");
  return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  
  if (!password) throw new Error("Password is required");
  if (!this.password) throw new Error("Password not set on user document");

  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, email: this.email },
    config.JWT,
    {
      expiresIn: config.JWT_EXP,
    }
  );
  return token;
};

userSchema.statics.verifyToken = function (token) {
  if (!token) {
    throw new Error("Token is required");
  }
  return jwt.verify(token, config.JWT);
};

module.exports = mongoose.model("User", userSchema);
