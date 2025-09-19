import mongoose, { Schema } from "mongoose";
const categorySchem = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const categoryModel =
  mongoose.models.categories ?? mongoose.model("categories", categorySchem);
