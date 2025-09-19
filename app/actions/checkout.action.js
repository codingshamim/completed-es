"use server";

import formateMongo from "@/helpers/formateMongo";
import { ProductModel } from "../backend/models/ProductModel";
import { auth } from "@/auth";
import { dbConnect } from "../backend/connection/dbConnect";
import { orderModel } from "../backend/models/orderModel";
import mongoose from "mongoose";
import { cartModel } from "../backend/models/CartModel";
import { revalidatePath } from "next/cache";

// Input validation schemas
const addressSchema = {
  name: { required: true, type: "string", minLength: 2, maxLength: 100 },
  phone: {
    required: true,
    type: "string",
    pattern: /^(?:\+8801|01)[3-9]\d{8}$/,
  },
  address: { required: true, type: "string", minLength: 10, maxLength: 500 },
  city: { required: true, type: "string", maxLength: 100 },
  district: { required: true, type: "string", maxLength: 100 },
  postalCode: { required: false, type: "string", maxLength: 10 },
};

const orderItemSchema = {
  productId: { required: true, type: "object" },
  quantity: { required: true, type: "number", min: 1, max: 100 },
  price: { required: true, type: "number", min: 0 },
  size: { required: true, type: "string", maxLength: 20 },
};

// Validation helper functions
const validateField = (value, rules, fieldName) => {
  const errors = [];

  if (
    rules.required &&
    (value === undefined || value === null || value === "")
  ) {
    errors.push(`${fieldName} is required`);
    return errors;
  }

  if (value !== undefined && value !== null && value !== "") {
    if (rules.type === "string" && typeof value !== "string") {
      errors.push(`${fieldName} must be a string`);
    }

    if (
      rules.type === "number" &&
      (typeof value !== "number" || isNaN(value))
    ) {
      errors.push(`${fieldName} must be a valid number`);
    }

    if (rules.type === "string" && typeof value === "string") {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(
          `${fieldName} must be at least ${rules.minLength} characters long`
        );
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(
          `${fieldName} must not exceed ${rules.maxLength} characters`
        );
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push(`${fieldName} format is invalid`);
      }
    }

    if (rules.type === "number" && typeof value === "number") {
      if (rules.min !== undefined && value < rules.min) {
        errors.push(`${fieldName} must be at least ${rules.min}`);
      }

      if (rules.max !== undefined && value > rules.max) {
        errors.push(`${fieldName} must not exceed ${rules.max}`);
      }
    }
  }

  return errors;
};

const validateAddress = (address) => {
  const errors = [];

  if (!address || typeof address !== "object") {
    return ["Invalid address format"];
  }

  Object.keys(addressSchema).forEach((field) => {
    const fieldErrors = validateField(
      address[field],
      addressSchema[field],
      field
    );
    errors.push(...fieldErrors);
  });

  return errors;
};

const validateOrderItems = (orders) => {
  const errors = [];

  if (!Array.isArray(orders) || orders.length === 0) {
    return ["Orders must be a non-empty array"];
  }

  if (orders.length > 50) {
    return ["Too many items in order (maximum 50 allowed)"];
  }

  orders.forEach((item, index) => {
    if (!item || typeof item !== "object") {
      errors.push(`Order item ${index + 1} is invalid`);
      return;
    }

    Object.keys(orderItemSchema).forEach((field) => {
      const fieldErrors = validateField(
        item[field],
        orderItemSchema[field],
        `Order item ${index + 1} ${field}`
      );
      errors.push(...fieldErrors);
    });
  });

  return errors;
};

const sanitizeString = (str) => {
  if (typeof str !== "string") return str;

  // Remove HTML tags and trim whitespace
  return str.replace(/<[^>]*>?/gm, "").trim();
};

const sanitizeInput = (data) => {
  if (typeof data === "string") {
    return sanitizeString(data);
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeInput);
  }

  if (data && typeof data === "object") {
    const sanitized = {};
    Object.keys(data).forEach((key) => {
      sanitized[key] = sanitizeInput(data[key]);
    });
    return sanitized;
  }

  return data;
};

const getCheckoutItemById = async (productId) => {
  try {
    // Input validation
    if (!productId) {
      return {
        error: true,
        message: "Product ID is required",
      };
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return {
        error: true,
        message: "Invalid product ID format",
      };
    }

    await dbConnect();

    const product = await ProductModel.findById(productId).lean();

    if (!product) {
      return {
        error: true,
        message: "Product not found",
      };
    }

    return {
      error: false,
      data: formateMongo(product),
    };
  } catch (err) {
    console.error("Error fetching checkout item:", err);
    return {
      error: true,
      message: "Failed to fetch product. Please try again.",
    };
  }
};

const makeCheckout = async (checkout) => {
  try {
    // Authentication check
    const loggedAuth = await auth();
    if (!loggedAuth?.user?.id) {
      return {
        error: true,
        message: "Authentication required. Please log in to continue.",
      };
    }

    const userId = loggedAuth.user.id;

    // Validate ObjectId format for user
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return {
        error: true,
        message: "Invalid user session. Please log in again.",
      };
    }

    // Input sanitization
    const sanitizedCheckout = sanitizeInput(checkout);

    // Input validation
    if (!sanitizedCheckout || typeof sanitizedCheckout !== "object") {
      return {
        error: true,
        message: "Invalid checkout data format",
      };
    }

    const { orders, address, paymentMethod, shippingOption, transactionId } =
      sanitizedCheckout;

    // Validate required fields
    const validationErrors = [];

    // Validate orders
    const orderErrors = validateOrderItems(orders);
    validationErrors.push(...orderErrors);

    // Validate address
    const addressErrors = validateAddress(address);
    validationErrors.push(...addressErrors);

    // Validate payment method
    if (
      !paymentMethod ||
      typeof paymentMethod !== "string" ||
      paymentMethod.trim() === ""
    ) {
      validationErrors.push("Payment method is required");
    }

    // Validate shipping option
    if (!shippingOption || typeof shippingOption !== "object") {
      validationErrors.push("Shipping option is required");
    } else {
      if (!shippingOption.title || !shippingOption.fee) {
        validationErrors.push("Invalid shipping option format");
      }
      if (typeof shippingOption.fee !== "number" || shippingOption.fee < 0) {
        validationErrors.push("Invalid shipping fee");
      }
    }

    // Validate transaction ID
    if (
      !transactionId ||
      typeof transactionId !== "string" ||
      transactionId.trim() === ""
    ) {
      validationErrors.push("Transaction ID is required");
    }

    if (validationErrors.length > 0) {
      return {
        error: true,
        message: validationErrors[0], // Return first validation error
        validationErrors,
      };
    }

    // Connect to database
    await dbConnect();

    // Enhanced product verification with stock checking
    const productVerificationPromises = orders.map(async (order) => {
      try {
        const productId = order.productId._id || order.productId;
        const product = await ProductModel.findById(productId).lean();

        if (!product) {
          throw new Error(`Product not found: ${productId}`);
        }

        // Check if stock field exists and is a valid number
        if (typeof product.stock !== "number" || product.stock < 0) {
          console.warn(
            `Product ${productId} has invalid stock value:`,
            product.stock
          );
          // If stock is not properly set, assume unlimited stock for now
          return { product, hasStock: true };
        }

        // Check stock availability
        if (product.stock < order.quantity) {
          throw new Error(
            `Insufficient stock for "${
              product.title || "Unknown Product"
            }". Available: ${product.stock}, Requested: ${order.quantity}`
          );
        }

        return { product, hasStock: true };
      } catch (error) {
        throw error;
      }
    });

    let verifiedProducts;
    try {
      verifiedProducts = await Promise.all(productVerificationPromises);
    } catch (verificationError) {
      return {
        error: true,
        message: verificationError.message,
      };
    }

    // Check for duplicate transaction ID
    const existingOrder = await orderModel.findOne({ transactionId }).lean();
    if (existingOrder) {
      return {
        error: true,
        message: "Duplicate transaction. Please refresh and try again.",
      };
    }

    // Prepare order data
    const orderData = {
      orders: orders.map((order) => ({
        productId: order.productId._id || order.productId, // Fixed: Ensure consistent productId
        quantity: parseInt(order.quantity),
        price: parseFloat(order.price),
        size: order.size,
      })),
      address: {
        name: address.name,
        phone: address.phone,
        address: address.address,
        city: address.city,
        district: address.district,
        postalCode: address.postalCode || "",
      },
      delivered: "Pending",
      transactionId,
      paymentMethod,
      shippingOption,
      user: new mongoose.Types.ObjectId(userId),
    };

    // Create order with transaction and stock management
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      // Create the order
      const response = await orderModel.create([orderData], { session });

      // Update product stock for each ordered item
      const stockUpdatePromises = orders.map(async (order, index) => {
        // Fixed: Extract productId consistently
        const productId = order.productId._id || order.productId;
        const quantity = parseInt(order.quantity);

        try {
          // Fixed: Use findOneAndUpdate with better error handling
          const updateResult = await ProductModel.findOneAndUpdate(
            {
              _id: new mongoose.Types.ObjectId(productId),
              stock: { $gte: quantity }, // Ensure we don't go negative
            },
            {
              $inc: { stock: -quantity },
            },
            {
              session,
              new: true, // Return updated document
              runValidators: true, // Run model validators
            }
          );

          if (!updateResult) {
            // Fixed: Better error message for stock update failure
            const currentProduct = await ProductModel.findById(
              productId
            ).session(session);
            if (!currentProduct) {
              throw new Error(
                `Product not found during stock update: ${productId}`
              );
            } else {
              throw new Error(
                `Insufficient stock for product. Available: ${currentProduct.stock}, Requested: ${quantity}`
              );
            }
          }

          // Log successful stock update

          return updateResult;
        } catch (error) {
          console.error(
            `❌ Error updating stock for product ${productId}:`,
            error
          );
          throw new Error(
            `Failed to update inventory for product: ${productId} - ${error.message}`
          );
        }
      });

      // Execute all stock updates
      await Promise.all(stockUpdatePromises);

      // Commit the transaction
      await session.commitTransaction();

      // Clear user's cart after successful order
      await cartModel.deleteMany({
        userId: userId,
      });

      // Revalidate relevant pages
      revalidatePath("/");
      revalidatePath("/products");
      revalidatePath("/cart");

      return {
        error: false,
        message: "Order placed successfully",
        data: {
          orderId: formateMongo(response)[0]?._id,
          transactionId: formateMongo(response)[0]?.transactionId,
          fee: formateMongo(response)[0]?.shippingOption?.fee || 0,
          name: checkout?.address?.name || "Customer",
        },
      };
    } catch (transactionError) {
      await session.abortTransaction();
      console.error("❌ Transaction error during checkout:", transactionError);

      // Return user-friendly error message
      if (
        transactionError.message.includes("stock") ||
        transactionError.message.includes("inventory")
      ) {
        return {
          error: true,
          message: transactionError.message,
        };
      }

      throw transactionError;
    } finally {
      session.endSession();
    }
  } catch (err) {
    console.error("❌ Checkout error:", err);

    // Handle specific error types
    if (err.name === "ValidationError") {
      return {
        error: true,
        message: "Invalid data provided. Please check your order details.",
      };
    }

    if (err.name === "MongoServerError" && err.code === 11000) {
      return {
        error: true,
        message: "Duplicate order detected. Please try again.",
      };
    }

    // Don't expose internal error details to client
    return {
      error: true,
      message:
        "Unable to process your order at this time. Please try again later.",
    };
  }
};

export { getCheckoutItemById, makeCheckout };
