"use server";

import { dbConnect } from "@/app/backend/connection/dbConnect";
import { chatUser } from "@/app/backend/models/chats/chatUser";
import formateMongo from "@/helpers/formateMongo";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

/**
 * Upload image helper function
 */
const uploadImage = async (base64Image, phone) => {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const timestamp = Date.now();
    const filename = `${phone}_${timestamp}.jpg`;

    const uploadDir = join(process.cwd(), "public", "chatimages");
    await mkdir(uploadDir, { recursive: true });

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    return `/chatimages/${filename}`;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw new Error("Failed to upload image");
  }
};

/**
 * Create a new chat message (used by customer ChatModal)
 */
const createChat = async (chatMessage, userDetails) => {
  try {
    await dbConnect();

    // Handle image upload if present
    let imagePath = null;
    if (chatMessage.image) {
      imagePath = await uploadImage(chatMessage.image, userDetails.phone);
    }

    const newChat = {
      text: chatMessage.text || "",
      sender: chatMessage.sender || "user",
      image: imagePath,
      name: userDetails.name,
      phone: userDetails.phone,
      isRead: false,
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

/**
 * Get chat history for a user (used by customer ChatModal)
 */
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

/**
 * Get all chat conversations grouped by phone number
 */
const getChats = async () => {
  try {
    await dbConnect();

    const chats = await chatUser.find().sort({ updatedAt: -1 }).lean();

    if (!chats || chats.length === 0) {
      return { data: [] };
    }

    const conversationsMap = new Map();

    chats.forEach((chat) => {
      const phone = chat.phone;

      if (!conversationsMap.has(phone)) {
        conversationsMap.set(phone, {
          id: phone,
          name: chat.name,
          phone: chat.phone,
          lastMessage: chat.text || "Image",
          lastMessageTime: chat.updatedAt,
          unreadCount: chat.isRead ? 0 : 1,
          online: false,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
            chat.name
          )}&backgroundColor=6b7280`,
          messages: [chat],
        });
      } else {
        const conversation = conversationsMap.get(phone);
        conversation.messages.push(chat);

        if (!chat.isRead) {
          conversation.unreadCount += 1;
        }

        if (new Date(chat.updatedAt) > new Date(conversation.lastMessageTime)) {
          conversation.lastMessage = chat.text || "Image";
          conversation.lastMessageTime = chat.updatedAt;
        }
      }
    });

    const conversations = Array.from(conversationsMap.values()).map((conv) => ({
      id: conv.id,
      name: conv.name,
      phone: conv.phone,
      lastMessage: conv.lastMessage,
      time: formatTime(conv.lastMessageTime),
      unread: conv.unreadCount,
      online: conv.online,
      avatar: conv.avatar,
      messageCount: conv.messages.length,
    }));

    conversations.sort(
      (a, b) =>
        new Date(conversationsMap.get(b.id).lastMessageTime) -
        new Date(conversationsMap.get(a.id).lastMessageTime)
    );

    return { data: formateMongo(conversations) };
  } catch (err) {
    console.error("Error fetching chats:", err);
    return {
      error: true,
      message: "Failed to fetch chats. Please try again later.",
    };
  }
};

/**
 * Get all messages for a specific phone number
 */
const getChatMessages = async (phone) => {
  try {
    if (!phone) {
      return {
        error: true,
        message: "Phone number is required",
      };
    }

    await dbConnect();

    const messages = await chatUser
      .find({ phone })
      .sort({ createdAt: 1 })
      .lean();

    if (!messages || messages.length === 0) {
      return { data: [] };
    }

    const formattedMessages = messages.map((msg) => ({
      id: msg._id.toString(),
      sender: msg.sender === "user" ? "client" : "admin",
      text: msg.text,
      image: msg.image,
      name: msg.name,
      time: formatTime(msg.createdAt),
      isRead: msg.isRead,
      createdAt: msg.createdAt,
    }));

    return { data: formattedMessages };
  } catch (err) {
    console.error("Error fetching chat messages:", err);
    return {
      error: true,
      message: "Failed to fetch messages. Please try again later.",
    };
  }
};

/**
 * Send a message from support to customer
 */
const sendSupportMessage = async (phone, messageData) => {
  try {
    if (!phone) {
      return {
        error: true,
        message: "Phone number is required",
      };
    }

    if (!messageData.text && !messageData.image) {
      return {
        error: true,
        message: "Message text or image is required",
      };
    }

    await dbConnect();

    // Get customer name from previous messages
    const existingChat = await chatUser.findOne({ phone }).lean();

    if (!existingChat) {
      return {
        error: true,
        message: "Conversation not found",
      };
    }

    // Handle image upload if present
    let imagePath = null;
    if (messageData.image) {
      imagePath = await uploadImage(messageData.image, phone);
    }

    const newMessage = {
      text: messageData.text || "",
      sender: "support",
      image: imagePath,
      name: existingChat.name,
      phone: phone,
      isRead: false,
      createdAt: new Date(),
    };

    const message = await chatUser.create(newMessage);

    return {
      success: true,
      data: formateMongo(message),
    };
  } catch (err) {
    console.error("Error sending support message:", err);
    return {
      error: true,
      message: "Failed to send message. Please try again.",
    };
  }
};

/**
 * Mark messages as read for a specific phone number
 */
const markMessagesAsRead = async (phone) => {
  try {
    if (!phone) {
      return {
        error: true,
        message: "Phone number is required",
      };
    }

    await dbConnect();

    await chatUser.updateMany(
      { phone, isRead: false, sender: "user" },
      { $set: { isRead: true } }
    );

    return { success: true };
  } catch (err) {
    console.error("Error marking messages as read:", err);
    return {
      error: true,
      message: "Failed to mark messages as read",
    };
  }
};

/**
 * Delete all messages for a specific phone number
 */
const deleteConversation = async (phone) => {
  try {
    if (!phone) {
      return {
        error: true,
        message: "Phone number is required",
      };
    }

    await dbConnect();

    await chatUser.deleteMany({ phone });

    return { success: true };
  } catch (err) {
    console.error("Error deleting conversation:", err);
    return {
      error: true,
      message: "Failed to delete conversation",
    };
  }
};

/**
 * Delete all conversations
 */
const deleteAllConversations = async () => {
  try {
    await dbConnect();

    await chatUser.deleteMany({});

    return { success: true };
  } catch (err) {
    console.error("Error deleting all conversations:", err);
    return {
      error: true,
      message: "Failed to delete all conversations",
    };
  }
};

/**
 * Format timestamp to readable time
 */
function formatTime(date) {
  if (!date) return "";

  const messageDate = new Date(date);
  const now = new Date();
  const diffInMs = now - messageDate;
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInHours < 24 && messageDate.getDate() === now.getDate()) {
    return messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (diffInDays < 2 && messageDate.getDate() === now.getDate() - 1) {
    return "Yesterday";
  }

  if (diffInDays < 7) {
    return messageDate.toLocaleDateString("en-US", { weekday: "short" });
  }

  return messageDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export {
  // Customer chat functions
  createChat,
  getChatHistory,

  // Admin inbox functions
  getChats,
  getChatMessages,
  sendSupportMessage,
  markMessagesAsRead,
  deleteConversation,
  deleteAllConversations,
};
