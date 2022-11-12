import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      minlength: 8,
      indexes: 1,
      unique: true,
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
