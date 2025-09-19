"use server";

import { auth } from "@/auth";
import { dbConnect } from "../connection/dbConnect";
import { notificationModel } from "../models/notificationModel";
import formateMongo from "@/helpers/formateMongo";

const createNotification = async (data) => {
  const loggedAuth = await auth();
  const notificationObject = {
    title: data?.title.trim() || "",
    message: data?.message.trim() || "",
    type: data?.type.trim() || "",
    user: loggedAuth?.user?.id,
  };

  try {
    await dbConnect();
    const notificationRes = await notificationModel.create(notificationObject);
    return {
      ok: true,
      data: formateMongo(notificationRes),
    };
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};

const getNotifications = async (page = 1, limit = 10) => {
  const loggedAuth = await auth();

  if (!loggedAuth?.user?.id) {
    return {
      error: true,
      message: "User not authenticated",
    };
  }

  try {
    await dbConnect();
    const skip = (page - 1) * limit;

    const notifications = await notificationModel
      .find({ user: loggedAuth.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await notificationModel.countDocuments({
      user: loggedAuth.user.id,
    });
    const hasMore = skip + notifications.length < totalCount;

    return {
      ok: true,
      data: formateMongo(notifications),
      pagination: {
        page,
        limit,
        totalCount,
        hasMore,
      },
    };
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};

const markNotificationAsRead = async (notificationId) => {
  const loggedAuth = await auth();

  if (!loggedAuth?.user?.id) {
    return {
      error: true,
      message: "User not authenticated",
    };
  }

  try {
    await dbConnect();
    await notificationModel.findOneAndUpdate(
      { _id: notificationId, user: loggedAuth.user.id },
      { isRead: true }
    );

    return {
      ok: true,
      message: "Notification marked as read",
    };
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};

const markAllNotificationsAsRead = async () => {
  const loggedAuth = await auth();

  if (!loggedAuth?.user?.id) {
    return {
      error: true,
      message: "User not authenticated",
    };
  }

  try {
    await dbConnect();
    await notificationModel.updateMany(
      { user: loggedAuth.user.id, isRead: false },
      { isRead: true }
    );

    return {
      ok: true,
      message: "All notifications marked as read",
    };
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};

const getUnreadNotificationCount = async () => {
  const loggedAuth = await auth();

  if (!loggedAuth?.user?.id) {
    return {
      error: true,
      message: "User not authenticated",
    };
  }

  try {
    await dbConnect();
    const count = await notificationModel.countDocuments({
      user: loggedAuth.user.id,
      isRead: false,
    });

    return {
      ok: true,
      count,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};

export {
  createNotification,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount,
};
