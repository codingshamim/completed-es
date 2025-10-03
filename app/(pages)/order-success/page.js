import { redirect } from "next/navigation";
import mainPrice from "@/helpers/mainPrice";
import Link from "next/link";
export const metadata = {
  title: "Esvibes - Order Success",
};
export default async function SuccessPage({ searchParams }) {
  const { transactionId, totalAmount, name, fee } = (await searchParams) || {};

  // If any required query parameter is missing, redirect to homepage (or another safe page)
  if (!transactionId || !totalAmount || !name) {
    redirect("/"); // You can redirect to a custom error page if you prefer
  }

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        {/* ✅ Confirmed UI */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="relative w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25 float-animation">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                className="checkmark-path"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Order Confirmed!
          </h1>
          <p className="text-gray-300 text-lg">
            Thank you for your purchase, {name}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your order has been successfully processed and will be shipped soon.
            You’ll receive a confirmation email with tracking details.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Order Number</span>
            <span className="font-mono text-green-400">{transactionId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Estimated Delivery</span>
            <span className="text-white">3–5 business days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Total Amount</span>
            <span className="text-xl font-semibold text-white">
              {mainPrice(parseFloat(totalAmount) + parseFloat(fee) || 0)}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex space-x-3">
            <Link
              href="/shop"
              className="flex-1 border border-gray-600 text-gray-300 font-medium py-3 px-4 rounded-lg hover:bg-secondary hover:border-secondary transition-colors duration-200"
            >
              Continue Shopping
            </Link>
            <Link
              href={`/dashboard/order/${transactionId}`}
              className="flex-1 border border-secondary text-gray-300 font-medium py-3 px-4 rounded-lg hover:bg-secondary hover:border-secondary transition-colors duration-200"
            >
              View Order Details
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm mb-4">
            Need help with your order?
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link
              href="/contact"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
