import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  coupon: {
    type: String,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
});

export const couponModel =
  mongoose.models.coupons ?? mongoose.model("coupons", couponSchema);
