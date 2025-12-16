"use server";

import { dbConnect } from "@/app/backend/connection/dbConnect";
import { chatUser } from "@/app/backend/models/chats/chatUser";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";
import formateMongo from "@/helpers/formateMongo";

const createChat = async (chatMessage, userDetails) => {
  try {
    await dbConnect();

    // Handle image upload if present
    let imagePath = null;
    if (chatMessage.image) {
      imagePath = await uploadImage(chatMessage.image, userDetails.phone);
      delete chatMessage.image; // Remove base64 from database
    }

    // Remove timestamp before saving
    delete chatMessage.timestamp;

    const newChat = {
      text: chatMessage.text,
      sender: chatMessage.sender,
      image: imagePath,
      name: userDetails.name,
      phone: userDetails.phone,
      createdAt: new Date(),
    };

    const chat = await chatUser.create(newChat);

    return {
      success: true,
      data: formateMongo(chat),
      imagePath: imagePath,
    };
  } catch (err) {
    console.error("Error creating chat:", err);
    return {
      success: false,
      error: err.message,
    };
  }
};

const uploadImage = async (base64Image, phone) => {
  try {
    // Remove data:image/...;base64, prefix
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Create unique filename
    const timestamp = Date.now();
    const filename = `${phone}_${timestamp}.jpg`;

    // Ensure directory exists
    const uploadDir = join(process.cwd(), "public", "chatimages");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Write file
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return public URL path
    return `/chatimages/${filename}`;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw new Error("Failed to upload image");
  }
};

// Get chat history for a user
const getChatHistory = async (phone) => {
  try {
    await dbConnect();
    const chats = await chatUser.find({ phone }).sort({ createdAt: 1 }).lean();

    return {
      success: true,
      data: formateMongo(chats),
    };
  } catch (err) {
    console.error("Error getting chat history:", err);
    return {
      success: false,
      error: err.message,
    };
  }
};

export { createChat, getChatHistory };
