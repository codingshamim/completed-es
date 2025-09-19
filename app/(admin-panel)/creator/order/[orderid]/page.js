/* eslint-disable react/no-unescaped-entities */
import getOrder from "@/app/backend/queries/getOrder";
import OrderItems from "./_components/OrderItems";
import OrderTimeline from "./_components/OrderTimeline";
import ShippingAddress from "./_components/ShippingAddress";
import OrderHeader from "./_components/OrderHeader";
import PaymentInformation from "./_components/PaymentInformation";
import OrderSummary from "./_components/OrderSummary";
import { calculateItemTotal } from "@/helpers/calculateItemTotal";
import CustomerInformation from "./_components/CustomerInformation";
import OrderAction from "./_components/OrderAction";
import Link from "next/link";

// No Order Found Component
function NoOrderFound({ orderId }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gray-900 rounded-full flex items-center justify-center border-2 border-gray-700">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">Order Not Found</h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            We couldn't find an order with this ID. Please check your order
            number and try again.
          </p>

          {orderId && (
            <div className="bg-black border border-gray-700 rounded-lg p-4 mt-6">
              <p className="text-sm text-gray-500 mb-1">Order ID searched:</p>
              <p className="font-mono text-gray-300 break-all">{orderId}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-4">
          <div className="flex gap-4">
            <Link
              href="/creator/orders"
              className="flex-1 bg-black text-white font-medium py-3 px-6 rounded-lg border border-gray-600 hover:bg-secondary transition-colors duration-200"
            >
              View All Orders
            </Link>

            <Link
              href="/contact"
              className="flex-1 bg-black text-white font-medium py-3 px-6 rounded-lg border border-gray-600 hover:bg-secondary transition-colors duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            Need help? Check your email for the order confirmation or
            <span className="text-white hover:underline cursor-pointer ml-1">
              contact our support team
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function OrderViewPage({ params }) {
  const param = await params;
  const orderId = param?.orderid || null;
  const order = await getOrder(orderId);

  // Show No Order Found UI if order is falsy
  if (!order) {
    return <NoOrderFound orderId={orderId} />;
  }

  const total = calculateItemTotal(order?.orders);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <OrderHeader order={order} transactionId={order?.transactionId} />

      <div className="mx-auto px-6 py-8">
        {/* Order Status Timeline */}
        <OrderTimeline status={order?.delivered} createdAt={order?.createdAt} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Order Items & Details */}
          <div className="xl:col-span-2 space-y-8">
            {/* Order Items */}
            <OrderItems orders={order?.orders} />

            {/* Shipping Address */}
            <ShippingAddress address={order?.address} />

            {/* Payment Information */}
            <PaymentInformation
              createdAt={
                order?.paymentDetails?.submittedAt
                  ? order?.paymentDetails?.submittedAt
                  : order?.createdAt
              }
              paymentMethod={order?.paymentMethod}
              paymentNumber={order?.paymentDetails?.customerPhone || "N/A"}
              paymentStatus={
                order?.paymentDetails?.verificationStatus || "pending"
              }
              transactionId={
                order?.paymentDetails?.customerTransactionId || "N/A"
              }
              orderId={order?._id}
              tranId={order?.transactionId}
            />
          </div>

          {/* Right Column - Order Summary & Actions */}
          <div className="space-y-8">
            {/* Order Summary */}
            <OrderSummary
              total={total}
              shippingOption={order?.shippingOption}
            />

            {/* Order Actions */}
            <OrderAction orderId={order?._id} />

            {/* Customer Information */}
            <CustomerInformation user={order?.user} />
          </div>
        </div>
      </div>
    </div>
  );
}
