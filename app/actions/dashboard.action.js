"use server";

import formateMongo from "@/helpers/formateMongo";
import { ProductModel } from "../backend/models/ProductModel";
import { dbConnect } from "../backend/connection/dbConnect";
import { checkAdmin } from "./product.action";
import { orderModel } from "../backend/models/orderModel";
const dashboardStats = async () => {
  try {
    const isAdmin = await checkAdmin();
    if (isAdmin) {
      // Get current date and calculate date ranges
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        0,
        23,
        59,
        59,
        999
      );
      await dbConnect();
      // Fetch all orders for comprehensive stats
      const allOrders = await orderModel.find({});

      // Filter orders by month
      const currentMonthOrders = allOrders.filter(
        (order) => new Date(order.createdAt) >= currentMonthStart
      );

      const lastMonthOrders = allOrders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= lastMonthStart && orderDate <= lastMonthEnd;
      });

      // Calculate total orders
      const totalOrders = {
        lastMonth: lastMonthOrders.length,
        currentMonth: currentMonthOrders.length,
        percentage: calculatePercentageIncrease(
          lastMonthOrders.length,
          currentMonthOrders.length
        ),
      };

      // Calculate total revenue
      const lastMonthRevenue = lastMonthOrders.reduce((total, order) => {
        const orderTotal = order.orders.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return total + orderTotal + (order.shippingOption?.fee || 0);
      }, 0);

      const currentMonthRevenue = currentMonthOrders.reduce((total, order) => {
        const orderTotal = order.orders.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return total + orderTotal + (order.shippingOption?.fee || 0);
      }, 0);

      const totalRevenue = {
        lastMonth: parseFloat(lastMonthRevenue.toFixed(2)),
        currentMonth: parseFloat(currentMonthRevenue.toFixed(2)),
        percentage: calculatePercentageIncrease(
          lastMonthRevenue,
          currentMonthRevenue
        ),
      };

      // Calculate total items sold
      const lastMonthItemsSold = lastMonthOrders.reduce(
        (total, order) =>
          total + order.orders.reduce((sum, item) => sum + item.quantity, 0),
        0
      );

      const currentMonthItemsSold = currentMonthOrders.reduce(
        (total, order) =>
          total + order.orders.reduce((sum, item) => sum + item.quantity, 0),
        0
      );

      const totalItemsSold = {
        lastMonth: lastMonthItemsSold,
        currentMonth: currentMonthItemsSold,
        percentage: calculatePercentageIncrease(
          lastMonthItemsSold,
          currentMonthItemsSold
        ),
      };

      return {
        error: false,
        totalOrders,
        totalRevenue,
        totalItemsSold,
        // Additional useful stats
        totalOrdersAllTime: allOrders.length,
        totalRevenueAllTime: parseFloat(
          allOrders
            .reduce((total, order) => {
              const orderTotal = order.orders.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );
              return total + orderTotal + (order.shippingOption?.fee || 0);
            }, 0)
            .toFixed(2)
        ),
        totalItemsSoldAllTime: allOrders.reduce(
          (total, order) =>
            total + order.orders.reduce((sum, item) => sum + item.quantity, 0),
          0
        ),
      };
    } else {
      return {
        error: false,
        message: "You are not authorized to view this data.",
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message, // Fixed typo: was "errr?.message"
    };
  }
};

// Helper function to calculate percentage increase from last month to current month
const calculatePercentageIncrease = (lastMonth, currentMonth) => {
  if (lastMonth === 0) {
    return currentMonth > 0 ? 100 : 0; // If no orders last month, any orders this month = 100% increase
  }

  const increase = ((currentMonth - lastMonth) / lastMonth) * 100;
  return parseFloat(increase.toFixed(2));
};

const lowStockItems = async () => {
  try {
    await dbConnect();
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return {
        error: true,
        message: "You are not authorized to view this data.",
      };
    }
    const lowStockItems = await ProductModel.find({
      stock: { $lt: 10 },
    }).select(["title", "sku", "thumbnail", "stock"]);
    return {
      error: false,
      products: formateMongo(lowStockItems),
    };
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};

const recentOrder = async () => {
  try {
    const isAdmin = await checkAdmin();
    if (isAdmin) {
      await dbConnect();
      const orders = await orderModel.find({}).sort({ createdAt: -1 }).limit(5);
      return {
        error: false,
        orders: formateMongo(orders),
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message,
    };
  }
};

export { dashboardStats, lowStockItems, recentOrder };
