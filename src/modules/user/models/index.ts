import { Schema, model } from "mongoose";
import { v4 } from "uuid";

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    // User
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["super_admin", "admin", "user", "guest"],
      default: "guest",
    },
    // Profile
    screenName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("user", UserSchema);
