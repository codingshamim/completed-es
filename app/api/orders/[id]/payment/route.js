// app/api/orders/[id]/payment/route.js
import { NextResponse } from "next/server";

import { dbConnect } from "@/app/backend/connection/dbConnect";
import { orderModel } from "@/app/backend/models/orderModel";

export async function PATCH(request, { params }) {
  try {
    await dbConnect();

    const { paymentStatus } = await request.json();
    const { id } = params;

    // Validate order exists
    const order = await orderModel.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Validate payment status
    const validPaymentStatuses = ["pending", "paid", "failed", "refunded"];
    if (!validPaymentStatuses.includes(paymentStatus)) {
      return NextResponse.json(
        { error: "Invalid payment status" },
        { status: 400 }
      );
    }

    // Update payment status
    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      {
        paymentStatus,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Payment status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}