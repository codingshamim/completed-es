import mongoose, { Schema } from "mongoose";
const checkoutSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Assuming you have a 'User' model
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Product", // Assuming you have a 'Product' model
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const checkouts = mongoose.model("checkouts", checkoutSchema);

module.exports = Checkout;
