import mongoose, { Schema } from "mongoose";
const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: false,
  },
});
export const cartModel =
  mongoose.models.carts ?? mongoose.model("carts", cartSchema);
