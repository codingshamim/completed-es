/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import mainPrice from "@/helpers/mainPrice";
import { submitPayment } from "@/app/actions/order2.action";

export default function Form({
  paymentMethod,
  totalAmount,
  shippingFee,
  currentPaymentInfo,
  orderTransactionId, // The order transaction ID from URL params
}) {
  const [formData, setFormData] = useState({
    customerPhone: "",
    customerTransactionId: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation functions
  const validatePhone = (phone) => {
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone))
      return "Please enter a valid Bangladeshi mobile number (01XXXXXXXXX)";
    return "";
  };

  const validateTransactionId = (transactionId) => {
    if (!transactionId) return "Transaction ID is required";
    if (transactionId.length < 8)
      return "Transaction ID must be at least 8 characters";
    if (transactionId.length > 20)
      return "Transaction ID must not exceed 20 characters";
    // Check for valid transaction ID pattern (alphanumeric)
    if (!/^[A-Z0-9]+$/.test(transactionId))
      return "Transaction ID should only contain letters and numbers";
    return "";
  };

  // Handle input changes with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format phone number (remove non-digits and limit to 11 digits)
    let formattedValue = value;
    if (name === "customerPhone") {
      formattedValue = value.replace(/\D/g, "").slice(0, 11);
    }

    // Format transaction ID (remove spaces and convert to uppercase)
    if (name === "customerTransactionId") {
      formattedValue = value.replace(/\s/g, "").toUpperCase().slice(0, 20);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError("");
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    const phoneError = validatePhone(formData.customerPhone);
    if (phoneError) newErrors.customerPhone = phoneError;

    const transactionError = validateTransactionId(
      formData.customerTransactionId
    );
    if (transactionError) newErrors.customerTransactionId = transactionError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!orderTransactionId) {
      setSubmitError(
        "Order transaction ID is missing. Please refresh the page."
      );
      return;
    }

    setIsLoading(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const paymentData = {
        paymentMethod: currentPaymentInfo.title.toLowerCase(),
        customerPhone: formData.customerPhone,
        customerTransactionId: formData.customerTransactionId,
        paymentAmount:
          paymentMethod === "cod" ? shippingFee : totalAmount + shippingFee,
        paymentProvider: currentPaymentInfo.title,
        verificationStatus: "submitted",
        submittedAt: new Date().toISOString(),
      };

      const result = await submitPayment(orderTransactionId, paymentData);

      if (result?.error) {
        throw new Error(
          result.message || "Failed to verify payment. Please try again."
        );
      }

      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        customerPhone: "",
        customerTransactionId: "",
      });

      // You can redirect to success page or show order details
    } catch (error) {
      setSubmitError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black border border-gray-700 rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Payment Verification
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            After paying{" "}
            {mainPrice(
              paymentMethod === "cod" ? shippingFee : totalAmount + shippingFee
            )}{" "}
            (via QR code or manual transfer), please provide your transaction
            details below:
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-900/20 border border-green-500/30 text-green-300 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <p className="font-medium">
                  Payment verification submitted successfully!
                </p>
                <p className="text-sm text-green-400 mt-1">
                  We'll verify your payment and update your order status within
                  10-15 minutes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-900/20 border border-red-500/30 text-red-300 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <div>
                <p className="font-medium">Payment verification failed</p>
                <p className="text-sm text-red-400 mt-1">{submitError}</p>
              </div>
            </div>
          </div>
        )}

        <div
          className={`transition-opacity duration-200 space-y-6 ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          {/* Phone Number Field */}
          <div>
            <label
              htmlFor="customerPhone"
              className="block text-sm font-medium text-white mb-2"
            >
              Your {currentPaymentInfo.title} Number *
            </label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              placeholder="01XXXXXXXXX"
              className={`w-full bg-black border ${
                errors.customerPhone
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-600 focus:border-white"
              } focus:outline-none px-4 py-3 text-white rounded transition-colors ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              required
            />
            {errors.customerPhone && (
              <p className="text-xs text-red-400 mt-1 flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {errors.customerPhone}
              </p>
            )}
            {!errors.customerPhone && (
              <p className="text-xs text-gray-400 mt-1">
                Enter the {currentPaymentInfo.title} number you used to send
                money
              </p>
            )}
          </div>

          {/* Transaction ID Field */}
          <div>
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-white mb-2"
            >
              Transaction ID *
            </label>
            <input
              type="text"
              id="transactionId"
              name="customerTransactionId"
              value={formData.customerTransactionId}
              onChange={handleInputChange}
              placeholder="Enter transaction ID from SMS"
              className={`w-full bg-black border ${
                errors.customerTransactionId
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-600 focus:border-white"
              } focus:outline-none px-4 py-3 text-white rounded transition-colors font-mono ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              required
            />
            {errors.customerTransactionId && (
              <p className="text-xs text-red-400 mt-1 flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {errors.customerTransactionId}
              </p>
            )}
            {!errors.customerTransactionId && (
              <p className="text-xs text-gray-400 mt-1">
                You'll receive this in SMS after successful money transfer
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-white text-black font-semibold py-3 px-4 rounded transition-all duration-200 ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 active:bg-gray-200"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying Payment...
              </div>
            ) : (
              "Verify Payment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
