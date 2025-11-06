import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orders: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    address: {
      type: Object,
      required: true,
    },
    delivered: {
      type: String,
      default: "Pending",
    },
    transactionId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentMethod: { type: String, required: false },
    shippingOption: {
      type: Object,
      required: true,
    },
    paymentDetails: {
      type: Object,
      required: false,
    },

    user: { type: Schema.Types.ObjectId, ref: "users", required: false },
  },

  { timestamps: true }
);

export const orderModel =
  mongoose.models.orders ?? mongoose.model("orders", orderSchema);
