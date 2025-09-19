import mongoose, { Schema } from "mongoose";
const reviewsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  content: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.ObjectId,
    required: true,
  },
  images: [
    {
      type: String, // fileUrl path
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ReviewsModel =
  mongoose.models.reviews ?? mongoose.model("reviews", reviewsSchema);
