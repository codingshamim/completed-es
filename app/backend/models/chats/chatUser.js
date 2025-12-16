import mongoose from "mongoose";

const chatUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true, // Index for faster queries
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String, // Stores the path: /chatimages/filename.jpg
      default: null,
    },
    sender: {
      type: String,
      required: true,
      enum: ["user", "support"],
      default: "user",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create compound index for efficient querying
chatUserSchema.index({ phone: 1, createdAt: -1 });

export const chatUser =
  mongoose.models.ChatUser || mongoose.model("ChatUser", chatUserSchema);
