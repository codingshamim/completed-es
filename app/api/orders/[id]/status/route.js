// app/api/orders/[id]/status/route.js
import { NextResponse } from "next/server";

import { dbConnect } from "@/app/backend/connection/dbConnect";
import { orderModel } from "@/app/backend/models/orderModel";

export async function PATCH(request, { params }) {
  try {
    await dbConnect();

    const { delivered, paymentStatus, notes } = await request.json();
    const { id } = params;

    // Validate order exists
    const order = await orderModel.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Validate status values
    const validOrderStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    const validPaymentStatuses = ["pending", "paid", "failed", "refunded"];

    if (delivered && !validOrderStatuses.includes(delivered)) {
      return NextResponse.json(
        { error: "Invalid order status" },
        { status: 400 }
      );
    }

    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return NextResponse.json(
        { error: "Invalid payment status" },
        { status: 400 }
      );
    }

    // Update order
    const updateData = {};
    if (delivered) updateData.delivered = delivered;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (notes) updateData.notes = notes;
    updateData.updatedAt = new Date();

    const updatedOrder = await orderModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



