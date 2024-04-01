import { Schema, model } from "mongoose";
import { v4 } from "uuid";

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    userId: {
      type: String,
    },
    steamId: {
      type: String,
    },
    username: {
      type: String,
    },
    displayName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("steam_user", UserSchema);
