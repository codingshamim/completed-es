"use client";

import { verifiedPaymentAction } from "@/app/actions/order2.action";
import { useState } from "react";

export default function VerifiedButton({ transactionId, orderId }) {
  const [customerTransactionId, setCustomerTransactionId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateInput = () => {
    if (!transactionId && customerTransactionId.trim() === "") {
      setError("Please provide a Transaction ID.");
      return false;
    }

    if (!orderId) {
      setError("Order ID is required.");
      return false;
    }

    return true;
  };

  const handleMarkAsPaid = async () => {
    try {
      // Reset states
      setError(null);
      setSuccess(false);

      // Validate input
      if (!validateInput()) {
        return;
      }

      setLoading(true);

      // Use existing transactionId or customer provided one
      const finalTransactionId = transactionId || customerTransactionId.trim();

      const response = await verifiedPaymentAction(orderId, finalTransactionId);

      if (response?.success) {
        setSuccess(true);
        setCustomerTransactionId(""); // Clear input on success

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response?.message || "Failed to verify payment");
      }
    } catch (err) {
      setError(
        err.message ||
          "An unexpected error occurred while verifying payment. Please try again."
      );

      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCustomerTransactionId(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Transaction ID Input */}
      <div className="relative">
        <input
          type="text"
          value={customerTransactionId}
          onChange={handleInputChange}
          placeholder="Enter Transaction ID"
          className={`w-full p-3 bg-black text-white border rounded-lg focus:outline-none transition-colors placeholder-gray-400 ${
            error
              ? "border-red-500 focus:border-red-400"
              : success
              ? "border-green-500 focus:border-green-400"
              : "border-gray-600 focus:border-white"
          } `}
          maxLength={100}
          autoComplete="off"
        />

        {/* Input validation indicator */}
        {customerTransactionId.trim() && !error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm font-medium">
            Payment verified successfully!
          </p>
        </div>
      )}

      {/* Verification Button */}
      <button
        onClick={handleMarkAsPaid}
        disabled={
          loading || (!transactionId && customerTransactionId.trim() === "")
        }
        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
          loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-black hover:shadow-md active:transform active:scale-[0.98]"
        } ${
          !transactionId && customerTransactionId.trim() === ""
            ? "opacity-60 cursor-not-allowed"
            : ""
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Verifying...</span>
          </div>
        ) : (
          "Mark as Verified"
        )}
      </button>

      {/* Helper Text */}
      <p className="text-gray-400 text-xs text-center">
        {transactionId
          ? "Transaction ID is already provided"
          : "Enter the transaction ID to verify this payment"}
      </p>
    </div>
  );
}
