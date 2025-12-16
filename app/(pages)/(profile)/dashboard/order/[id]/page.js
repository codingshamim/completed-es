/* eslint-disable react/no-unescaped-entities */
import getOrder from "@/app/backend/queries/getOrder";
import { PaymentMethod } from "../_components/PaymentMethod";
import ShippingAddress from "../_components/ShippingAddress";
import OrderItem from "../_components/OrderItem";
import mainPrice from "@/helpers/mainPrice";
import Link from "next/link";
import InvoiceDownloadButton from "./_components/InvoiceDownloadButton";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  CreditCard,
  RefreshCw,
} from "lucide-react";

export const metadata = {
  title: "ES FITT | Order Details",
};

// Helper function to format date
const formatDate = (dateString) => {
  try {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Date not available";
  }
};

// Helper function to calculate total
const calculateTotal = (orders = [], shippingFee = 0) => {
  try {
    const subtotal = orders.reduce((sum, item) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 0;
      return sum + price * quantity;
    }, 0);
    return {
      subtotal,
      shipping: Number(shippingFee) || 0,
      total: subtotal + (Number(shippingFee) || 0),
    };
  } catch (error) {
    console.error("Calculation error:", error);
    return { subtotal: 0, shipping: 0, total: 0 };
  }
};

// Get status configuration
const getStatusConfig = (delivered, paymentStatus) => {
  const deliveredLower = (delivered || "").toLowerCase();
  const paymentLower = (paymentStatus || "").toLowerCase();

  if (deliveredLower === "cancelled") {
    return {
      icon: "XCircle",
      color: "red",
      label: "Cancelled",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      textColor: "text-red-400",
      message:
        paymentLower === "refunded"
          ? "Order cancelled. Refund has been processed to your account"
          : "Order cancelled. Refund is being processed",
    };
  }

  if (deliveredLower === "delivered") {
    return {
      icon: "CheckCircle",
      color: "green",
      label: "Delivered",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
      message: "Your order has been delivered successfully",
    };
  }

  if (deliveredLower === "shipped") {
    return {
      icon: "Truck",
      color: "blue",
      label: "Shipped",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
      message: "Your order is on the way to your delivery address",
    };
  }

  if (paymentLower === "pending") {
    return {
      icon: "Clock",
      color: "yellow",
      label: "Payment Pending",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      textColor: "text-yellow-400",
      message: "Waiting for payment confirmation to process your order",
    };
  }

  return {
    icon: "Package",
    color: "purple",
    label: "Processing",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    message: "Your order is being prepared for shipment",
  };
};

// Error component
const OrderNotFound = () => (
  <div className="min-h-[40vh] bg-black flex items-center justify-center p-4">
    <div className="max-w-md w-full  border border-zinc-800 rounded-2xl p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
        <XCircle className="w-8 h-8 text-red-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Order Not Found</h2>
      <p className="text-zinc-400 mb-6">
        The order you're looking for doesn't exist or may have been removed.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

const StatusIcon = ({ iconName, className }) => {
  const icons = {
    Package: Package,
    Truck: Truck,
    CheckCircle: CheckCircle,
    XCircle: XCircle,
    Clock: Clock,
    RefreshCw: RefreshCw,
  };
  const Icon = icons[iconName] || Package;
  return <Icon className={className} />;
};

export default async function OrderDetails({ params }) {
  try {
    if (!params) return <OrderNotFound />;

    const param = await params;
    const orderId = param?.id;

    if (!orderId) return <OrderNotFound />;

    let order;
    try {
      order = await getOrder(orderId);
    } catch (fetchError) {
      console.error("Error fetching order:", fetchError);
      return <OrderNotFound />;
    }

    if (!order) return <OrderNotFound />;

    // Extract order data
    const orderId_display = order.transactionId || "Unknown";
    const orders = Array.isArray(order.orders) ? order.orders : [];
    const address = order.address || {};
    const user = order.user || {};
    const shippingOption = order.shippingOption || {};
    const delivered = order.delivered || "pending";
    const paymentStatus =
      order?.paymentDetails?.verificationStatus || "Pending";
    const paymentMethod = order.paymentMethod || "Not specified";
    const transactionId = order.transactionId || null;
    const createdAt = order.createdAt;
    const cancelledAt = order.cancelledAt;

    const { subtotal, shipping, total } = calculateTotal(
      orders,
      shippingOption.fee
    );
    const statusConfig = getStatusConfig(delivered, paymentStatus);
    const isCancelled = delivered?.toLowerCase() === "cancelled";

    // Progress calculation
    const deliveredLower = delivered?.toLowerCase();
    const paymentLower = paymentStatus?.toLowerCase();

    let progressSteps = [
      {
        icon: "Package",
        label: "Order Placed",
        completed: true,
      },
      {
        icon: "Truck",
        label: "Shipped",
        completed:
          deliveredLower === "shipped" || deliveredLower === "delivered",
      },
      {
        icon: "CheckCircle",
        label: "Delivered",
        completed: deliveredLower === "delivered",
      },
    ];

    if (isCancelled) {
      progressSteps = [
        { icon: "Package", label: "Order Placed", completed: true },
        {
          icon: "XCircle",
          label: "Cancelled",
          completed: true,
          cancelled: true,
        },
        {
          icon: "RefreshCw",
          label: "Refund",
          completed: paymentLower === "refunded",
          cancelled: true,
        },
      ];
    }

    const completedSteps = progressSteps.filter((s) => s.completed).length;
    const progressPercent =
      ((completedSteps - 1) / (progressSteps.length - 1)) * 100;

    if (orders.length === 0) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/10 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Empty Order</h2>
            <p className="text-zinc-400 mb-4">This order contains no items.</p>
            <div className="text-sm text-zinc-500 space-y-1">
              <p>Order ID: {orderId_display}</p>
              <p>Created: {formatDate(createdAt)}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-black py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Card */}
          <div className=" border border-zinc-800 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    Order #{orderId_display.slice(-12)}
                  </h1>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor} border`}
                  >
                    {statusConfig.label}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm mb-1">
                  Placed on {formatDate(createdAt)}
                </p>
                {isCancelled && cancelledAt && (
                  <p className="text-red-400 text-sm">
                    Cancelled on {formatDate(cancelledAt)}
                  </p>
                )}
              </div>
              <div className="text-left md:text-right">
                <p className="text-zinc-400 text-sm mb-1">
                  {isCancelled ? "Cancelled Amount" : "Total Amount"}
                </p>
                <p
                  className={`text-3xl font-bold ${
                    isCancelled
                      ? "text-red-400 line-through opacity-60"
                      : "text-white"
                  }`}
                >
                  {mainPrice(total.toFixed(2))}
                </p>
              </div>
            </div>

            {/* Status Banner */}
            <div
              className={`flex items-start gap-3 p-4 rounded-xl ${statusConfig.bgColor} ${statusConfig.borderColor} border`}
            >
              <StatusIcon
                iconName={statusConfig.icon}
                className={`w-6 h-6 ${statusConfig.textColor} flex-shrink-0 mt-0.5`}
              />
              <div className="flex-1">
                <p className={`font-semibold ${statusConfig.textColor} mb-1`}>
                  {statusConfig.label}
                </p>
                <p className="text-sm text-zinc-300">{statusConfig.message}</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className=" border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Order Progress
            </h2>

            {/* Desktop Progress */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-zinc-800 rounded-full">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCancelled
                        ? "bg-red-500"
                        : "bg-gradient-to-r from-purple-500 to-blue-500"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 relative">
                  {progressSteps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                          step.completed
                            ? step.cancelled
                              ? "bg-red-500 text-white"
                              : "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
                            : "bg-zinc-800 text-zinc-500"
                        }`}
                      >
                        <StatusIcon iconName={step.icon} className="w-5 h-5" />
                      </div>
                      <p
                        className={`text-sm font-medium mt-3 ${
                          step.completed
                            ? step.cancelled
                              ? "text-red-400"
                              : "text-white"
                            : "text-zinc-500"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Progress */}
            <div className="md:hidden space-y-4">
              {progressSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.completed
                        ? step.cancelled
                          ? "bg-red-500 text-white"
                          : "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    <StatusIcon iconName={step.icon} className="w-5 h-5" />
                  </div>
                  <p
                    className={`text-sm font-medium ${
                      step.completed
                        ? step.cancelled
                          ? "text-red-400"
                          : "text-white"
                        : "text-zinc-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className=" border border-zinc-800 rounded-2xl  p-4">
            <h2 className="text-xl font-semibold text-white mb-6">
              Order Items{" "}
              {isCancelled && (
                <span className="text-red-400 text-sm font-normal">
                  (Cancelled)
                </span>
              )}
            </h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className={isCancelled ? "opacity-60" : ""}
                >
                  <OrderItem order={order} />
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-zinc-800 mt-6 pt-6 space-y-3">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span
                  className={
                    isCancelled ? "line-through text-red-400" : "text-white"
                  }
                >
                  {mainPrice(subtotal.toFixed(2))}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping ({shippingOption.title || "Standard"})</span>
                <span
                  className={
                    isCancelled ? "line-through text-red-400" : "text-white"
                  }
                >
                  {mainPrice(shipping.toFixed(2))}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tax</span>
                <span
                  className={
                    isCancelled ? "line-through text-red-400" : "text-white"
                  }
                >
                  BDT 0.00
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-zinc-800 pt-3">
                <span className="text-white">Total</span>
                <span
                  className={
                    isCancelled ? "line-through text-red-400" : "text-green-400"
                  }
                >
                  {mainPrice(total.toFixed(2))}
                </span>
              </div>
              {isCancelled && (
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-red-300">Refund Amount</span>
                  <span className="text-red-300">
                    {mainPrice(total.toFixed(2))}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className=" border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">
                  Shipping Address
                </h2>
              </div>
              <ShippingAddress address={address} user={user} />
            </div>

            <div className=" border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">
                  Payment Details
                </h2>
              </div>
              <PaymentMethod
                paymentMethod={paymentMethod}
                paymentStatus={paymentStatus}
                transactionId={transactionId}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!isCancelled && (
              <InvoiceDownloadButton
                customClass="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all"
                order={order}
              >
                Download Invoice
              </InvoiceDownloadButton>
            )}
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3  text-white font-semibold rounded-xl hover:bg-secondary transition-all border border-zinc-700"
            >
              Contact Support
            </Link>
            {isCancelled && (
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all">
                Request Refund Status
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-zinc-400 mb-6">
            Unable to load order details. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}
