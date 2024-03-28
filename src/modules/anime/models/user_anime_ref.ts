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
    malId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("user_anime_ref", UserSchema);
