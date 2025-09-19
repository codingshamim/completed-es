import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["welcome", "order", "promotion", "reminder", "system"], // extend as needed
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users", // links notification to a user
      required: true,
    },
  },
  { timestamps: true }
);

export const notificationModel =
  mongoose.models.notifications ??
  mongoose.model("notifications", notificationSchema);
