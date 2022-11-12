import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      unique: true,
      type: String,
      required: true,
      maxLength: 50,
      minlength: 8,
      indexes: 1,
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
