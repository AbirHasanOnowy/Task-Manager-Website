const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // profileImage: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "ProfileImage",
    // },
    profileImageUrl: {
      type: String,
      default: null,
    },
    profileImagePublicId: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
// This code defines a Mongoose schema for a User model in a Node.js application.
