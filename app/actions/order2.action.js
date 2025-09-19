"use server";

import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../backend/connection/dbConnect";
import { orderModel } from "../backend/models/orderModel";

export async function isPay(transactionId) {
  try {
    await dbConnect();
    const order = await orderModel.find({ transactionId: transactionId });
    let isPayThisOrder = false;
    if (order.length > 0 && order[0]?.paymentStatus === "paid") {
      isPayThisOrder = true;
    } else {
      isPayThisOrder = false;
    }
    return {
      error: false,
      isPayThisOrder,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export async function getOrderTotalAmount(transactionId) {
  try {
    await dbConnect();
    const order = await orderModel.find({ transactionId: transactionId });
    const orders = order?.length > 0 ? formateMongo(order)[0]?.orders : [];
    const totalPrice = orders.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return {
      totalAmount: totalPrice || 0,
      shippingFee: order?.[0].shippingOption?.fee || 0,
      method: order?.[0].paymentMethod || "cod",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

// Validation functions
const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";
  const phoneRegex = /^01[3-9]\d{8}$/;
  if (!phoneRegex.test(phone))
    return "Please enter a valid Bangladeshi mobile number";
  return null;
};

const validateTransactionId = (transactionId) => {
  if (!transactionId) return "Transaction ID is required";
  if (typeof transactionId !== "string")
    return "Transaction ID must be a string";
  if (transactionId.length < 8)
    return "Transaction ID must be at least 8 characters";
  if (transactionId.length > 20)
    return "Transaction ID must not exceed 20 characters";
  if (!/^[A-Z0-9]+$/.test(transactionId))
    return "Transaction ID should only contain letters and numbers";
  return null;
};

const validatePaymentMethod = (paymentMethod) => {
  const validMethods = ["bkash", "nagad", "rocket"];
  if (!paymentMethod) return "Payment method is required";
  if (!validMethods.includes(paymentMethod.toLowerCase())) {
    return "Payment method must be one of: bKash, Nagad, Rocket";
  }
  return null;
};

const validatePaymentAmount = (amount) => {
  if (!amount) return "Payment amount is required";
  if (typeof amount !== "number" || amount <= 0)
    return "Payment amount must be a positive number";
  if (amount > 100000) return "Payment amount seems too high";
  return null;
};

export async function submitPayment(orderTransactionId, paymentData) {
  try {
    // Input validation
    if (!orderTransactionId) {
      return {
        error: true,
        message: "Order transaction ID is required",
      };
    }

    if (!paymentData || typeof paymentData !== "object") {
      return {
        error: true,
        message: "Payment data is required",
      };
    }

    // Validate individual fields
    const phoneError = validatePhone(paymentData.customerPhone);
    if (phoneError) {
      return {
        error: true,
        message: phoneError,
        field: "customerPhone",
      };
    }

    const transactionError = validateTransactionId(
      paymentData.customerTransactionId
    );
    if (transactionError) {
      return {
        error: true,
        message: transactionError,
        field: "customerTransactionId",
      };
    }

    const methodError = validatePaymentMethod(paymentData.paymentMethod);
    if (methodError) {
      return {
        error: true,
        message: methodError,
        field: "paymentMethod",
      };
    }

    const amountError = validatePaymentAmount(paymentData.paymentAmount);
    if (amountError) {
      return {
        error: true,
        message: amountError,
        field: "paymentAmount",
      };
    }

    // Connect to database
    await dbConnect();

    // Check if order exists
    const existingOrder = await orderModel.findOne({
      transactionId: orderTransactionId,
    });

    if (!existingOrder) {
      return {
        error: true,
        message: "Order not found. Please check your order ID.",
      };
    }

    // Check if payment is already verified
    if (
      existingOrder.paymentStatus === "verified" ||
      existingOrder.paymentStatus === "completed"
    ) {
      return {
        error: true,
        message: "Payment for this order has already been verified.",
      };
    }

    // Check for duplicate transaction ID
    const duplicateTransaction = await orderModel.findOne({
      "paymentDetails.customerTransactionId": paymentData.customerTransactionId,
      _id: { $ne: existingOrder._id },
    });

    if (duplicateTransaction) {
      return {
        error: true,
        message: "This transaction ID has already been used for another order.",
        field: "customerTransactionId",
      };
    }

    // Prepare payment details object
    const paymentDetails = {
      customerPhone: paymentData.customerPhone,
      customerTransactionId: paymentData.customerTransactionId,
      paymentAmount: paymentData.paymentAmount,
      paymentProvider: paymentData.paymentProvider,
      verificationStatus: paymentData.verificationStatus || "pending",
      submittedAt: paymentData.submittedAt || new Date().toISOString(),
      verifiedAt: null,
      verificationNotes: null,
    };

    // Update the order with payment details
    const order = await orderModel.findOneAndUpdate(
      {
        transactionId: orderTransactionId,
      },
      {
        paymentMethod: paymentData.paymentMethod,
        paymentDetails: paymentDetails,
        paymentStatus: "paid", // Status when customer submits details
      },
      {
        new: true, // Return updated document
        runValidators: true, // Run model validators
      }
    );
    const updatedOrder = order ? formateMongo(order) : null;
    if (!updatedOrder) {
      return {
        error: true,
        message: "Failed to update order. Please try again.",
      };
    }

    return {
      error: false,
      message: "Payment verification submitted successfully",
      data: {
        orderId: updatedOrder._id,
        transactionId: updatedOrder.transactionId,
        paymentStatus: updatedOrder.paymentStatus,
        submittedAt: paymentDetails.submittedAt,
      },
    };
  } catch (error) {
    console.error("Payment validation error:", error);

    // Handle specific mongoose errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return {
        error: true,
        message: `Validation error: ${validationErrors.join(", ")}`,
      };
    }

    if (error.name === "CastError") {
      return {
        error: true,
        message: "Invalid order ID format",
      };
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return {
        error: true,
        message:
          "Duplicate transaction detected. Please check your transaction ID.",
      };
    }

    return {
      error: true,
      message:
        error.message || "An unexpected error occurred. Please try again.",
    };
  }
}

export async function verifiedPaymentAction(orderId, customerTransactionId) {
  try {
    await dbConnect();
    const order = await orderModel.find({ transactionId: orderId });

    if (order.length === 0) {
      return {
        error: true,
        message: "Order not found. Please check your order ID.",
      };
    } else if (order[0]?.paymentDetails?.verificationStatus === "verified") {
      return {
        error: true,
        success: true,
        message: "Payment for this order has already been verified.",
      };
    }

    if (order[0]?.paymentDetails?.customerTransactionId) {
      const updateOrder = await orderModel.findOneAndUpdate(
        { transactionId: orderId },
        {
          $set: {
            "paymentDetails.verificationStatus": "verified",
            "paymentDetails.verifiedAt": new Date(),
            "paymentDetails.verificationNotes": `Verified by admin. Customer Transaction ID: ${customerTransactionId}`,
          },
        },
        { new: true }
      );

      if (updateOrder) {
        return {
          success: true,
          error: false,
          message: "Payment verification successful.",
          data: formateMongo(updateOrder),
        };
      }

      if (!updateOrder) {
        return {
          error: true,
          message: "Failed to update order verification status.",
        };
      }

      return {
        error: false,
        message: "Payment verification successful.",
        data: updateOrder,
      };
    } else {
      const updateOrder = await orderModel.findOneAndUpdate(
        { transactionId: orderId },
        {
          $set: {
            "paymentDetails.verificationStatus": "verified",
            "paymentDetails.customerTransactionId": customerTransactionId,
            "paymentDetails.verifiedAt": new Date(),
            "paymentDetails.verificationNotes": `Verified by admin.`,
          },
        },
        { new: true }
      );
      if (updateOrder) {
        return {
          error: false,
          message: "Payment verification successful.",
          data: formateMongo(updateOrder),
        };
      }
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}
