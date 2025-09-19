"use server";

import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../backend/connection/dbConnect";
import { orderModel } from "../backend/models/orderModel";
import { checkAdmin } from "./product.action";

import { UserModel } from "../backend/models/UserModel";

import { calculateOrdersTotal } from "@/helpers/calculateOrdersTotal";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

/**
 * Get paginated and filtered list of orders
 * @param {string} query - Search query to filter orders (customer name, phone, transactionId, etc.)
 * @param {string} status - Filter by delivery status (Pending, Delivered, etc.)
 * @param {number} limit - Number of orders per page (default: 10)
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<{ totalItems: number, orders: any[], currentPage: number, totalPages: number, hasNextPage: boolean, hasPrevPage: boolean, error?: boolean, message?: string }>}
 */
export default async function getOrders(
  query = "",
  status = "",
  limit = 10,
  page = 1
) {
  try {
    await dbConnect();

    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return {
        error: true,
        message: "Unauthorized",
        orders: [],
        totalItems: 0,
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      };
    }

    // Ensure limit and page are valid
    const validLimit = Math.max(1, Math.min(parseInt(limit) || 10, 100));
    const validPage = Math.max(1, parseInt(page) || 1);

    // Build filter
    const filter = {};

    if (query) {
      filter.$or = [
        { "address.name": { $regex: query, $options: "i" } },
        { "address.phone": { $regex: query, $options: "i" } },
        { transactionId: { $regex: query, $options: "i" } },
        { paymentMethod: { $regex: query, $options: "i" } },
      ];
    }

    if (status) {
      filter.delivered = status; // e.g. "Pending", "Delivered"
    }

    const skip = validLimit * (validPage - 1);

    const [totalItems, orders] = await Promise.all([
      orderModel.countDocuments(filter),
      orderModel
        .find(filter)
        .sort({ createdAt: -1 }) // latest orders first
        .limit(validLimit)
        .skip(skip)
        .populate({ path: "user", model: UserModel, select: ["name", "phone"] })
        .lean(),
    ]);

    const totalPages = Math.ceil(totalItems / validLimit);
    const completedOrder =
      orders.filter((order) => order.delivered === "Delivered").length || 0;
    const totalRevenue = calculateOrdersTotal(
      orders.filter((order) => order.delivered === "Delivered")
    );

    const pendingOrder =
      orders.filter((order) => order.delivered === "Pending").length || 0;
    return {
      totalItems,
      orders: formateMongo(orders) || [],
      currentPage: validPage,
      totalPages,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1,
      error: false,
      completedOrder,
      pendingOrder,
      totalRevenue,
    };
  } catch (err) {
    console.error("Error fetching orders:", err);
    return {
      error: true,
      message: "Failed to fetch orders. Please try again later.",
      orders: [],
      totalItems: 0,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }
}

export const getOrder = async (orderId) => {
  try {
    await dbConnect();

    const order = await orderModel
      .findById(orderId)
      .populate({ path: "user", model: UserModel, select: ["name", "phone"] })
      .lean();

    if (!order) {
      return {
        error: true,
        message: "Order not found",
      };
    }

    return {
      error: false,
      order: formateMongo(order),
    };
  } catch (err) {
    console.error("Error fetching order:", err);
    return {
      error: true,
      message: "Failed to fetch order. Please try again later.",
    };
  }
};

export const totalOrderByUser = async (userId) => {
  try {
    await dbConnect();

    // Convert userId to ObjectId if it's a string
    const userObjectId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : userId;

    const result = await orderModel.aggregate([
      {
        $match: {
          user: userObjectId,
          "paymentDetails.verificationStatus": "verified", // ✅ only verified payments
        },
      },
      {
        $group: {
          _id: null,
          totalOrder: { $sum: 1 }, // count total verified orders
          totalValue: {
            $sum: {
              $add: [
                {
                  $sum: {
                    $map: {
                      input: "$orders",
                      as: "item",
                      in: { $multiply: ["$$item.price", "$$item.quantity"] },
                    },
                  },
                },
                "$shippingOption.fee", // add shipping fee
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalOrder: 1,
          totalValue: 1,
        },
      },
    ]);

    return result.length > 0 ? result[0] : { totalOrder: 0, totalValue: 0 };
  } catch (err) {
    console.error("Error fetching total orders by user:", err);
    return { totalOrder: 0, totalValue: 0 }; // safe fallback
  }
};

export const updateStatus = async (orderId, status) => {
  const allStatus = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  if (!allStatus.includes(status)) {
    return {
      error: true,
      message: "Invalid status value",
    };
  }
  try {
    await dbConnect();
    const isAdmin = await checkAdmin();
    if (isAdmin) {
      await orderModel.findByIdAndUpdate(orderId, { delivered: status });
      revalidatePath("/");
      return {
        error: false,
        message: "Order status updated successfully",
      };
    } else {
      return {
        error: true,
        message: "You are not authorized to update this order",
      };
    }
  } catch (err) {
    return {
      error: true,
      message: "Something went wrong !",
    };
  }
};

export const deleteOrder = async (orderId) => {
  try {
    await dbConnect();
    if (orderId) {
      await orderModel.findByIdAndDelete(orderId);
      revalidatePath("/");
      return {
        error: false,
        message: "Order deleted successfully!",
        ok: true,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

export const getOrderByLoggedinUser = async () => {
  try {
    const user = await auth();
    if (user) {
      await dbConnect();
      const orders = await orderModel.find({ user: user.user?.id });
      return {
        error: false,
        orders: formateMongo(orders),
      };
    } else {
      return {
        error: true,
        message: "User not authenticated",
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};
// SERVER ACTION (order.action.js)
export const createOrderFromAdmin = async (order) => {
  try {
    await dbConnect();
    const loggedAuth = await auth();
    const userId = loggedAuth?.user?.id;
    const isAdmin = await checkAdmin();

    if (isAdmin) {
      const newOrder = {
        ...order,
        user: userId, // This will be stored as text
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createOrder = await orderModel.create(newOrder);

      // Return success response
      return {
        error: false,
        message: "Order created successfully!",
        data: formateMongo(createOrder),
      };
    } else {
      // This should be outside the if block
      return {
        error: true,
        message: "Unauthorized! Admin access required.",
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message || "Failed to create order",
    };
  }
};
