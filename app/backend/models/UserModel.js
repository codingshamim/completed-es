import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  role: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordOtp: {
    type: String,
    required: false,
  },
  address: {
    type: Object,
    required: false,
  },
  otp: {
    type: Number,
    required: false,
  },
});
export const UserModel =
  mongoose.models.users ?? mongoose.model("users", userSchema);
