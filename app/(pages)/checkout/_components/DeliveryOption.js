/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";

const paymentOptions = [
  {
    id: 1,
    title: "Cash on Delivery",
    icon: (
      <svg
        width={25}
        height={25}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    description: "Pay when you receive your order",
    color: "blue",
  },
  {
    id: 2,
    title: "bKash",
    icon: (
      <svg
        width={25}
        height={25}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
    description: "Pay using bKash mobile wallet",
    color: "pink",
  },
  {
    id: 3,
    title: "Nagad",
    icon: (
      <svg
        width={25}
        height={25}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    description: "Pay using Nagad mobile wallet",
    color: "orange",
  },
  {
    id: 4,
    title: "Rocket",
    icon: (
      <svg
        width={25}
        height={25}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    description: "Pay using Rocket mobile wallet",
    color: "purple",
  },
];

export default function PaymentOptions() {
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);

  const getColorClasses = (color, isSelected) => {
    const colors = {
      blue: isSelected
        ? "bg-blue-900/20 border-blue-500"
        : "border-gray-600 hover:border-blue-500/50",
      pink: isSelected
        ? "bg-pink-900/20 border-pink-500"
        : "border-gray-600 hover:border-pink-500/50",
      orange: isSelected
        ? "bg-orange-900/20 border-orange-500"
        : "border-gray-600 hover:border-orange-500/50",
      purple: isSelected
        ? "bg-purple-900/20 border-purple-500"
        : "border-gray-600 hover:border-purple-500/50",
    };
    return colors[color] || colors.blue;
  };

  const getInfoColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-900/20 border-blue-500/30 text-blue-300",
      pink: "bg-pink-900/20 border-pink-500/30 text-pink-300",
      orange: "bg-orange-900/20 border-orange-500/30 text-orange-300",
      purple: "bg-purple-900/20 border-purple-500/30 text-purple-300",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="border border-gray-700 p-4 space-y-4">
      <h2 className="font-semibold text-lg mb-2">Payment Method</h2>

      <div className="space-y-3">
        <input
          type="hidden"
          value={
            selectedPayment.title === "Cash on Delivery"
              ? "cod"
              : selectedPayment.title.toLowerCase()
          }
          readOnly
          name="paymentMethod"
        />

        {paymentOptions.map((payment) => (
          <button
            type="button"
            onClick={() => setSelectedPayment(payment)}
            key={payment.id}
            className={`w-full flex items-start gap-4 border px-4 py-4 text-left transition-all duration-200 rounded-lg ${getColorClasses(
              payment.color,
              payment.id === selectedPayment.id
            )}`}
          >
            <div className="flex-shrink-0 mt-0.5 text-white">
              {payment.icon}
            </div>

            <div className="flex-1">
              <div className="font-medium text-white text-base">
                {payment.title}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {payment.description}
              </div>
            </div>

            <div className="flex-shrink-0">
              <div
                className={`w-5 h-5 rounded-full border-2 transition-colors ${
                  payment.id === selectedPayment.id
                    ? "border-white bg-white"
                    : "border-gray-400"
                }`}
              >
                {payment.id === selectedPayment.id && (
                  <div className="w-3 h-3 bg-black rounded-full m-0.5"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Additional info for selected payment method */}
      {selectedPayment.id === 1 && (
        <div
          className={`${getInfoColorClasses(
            selectedPayment.color
          )} px-4 py-3 rounded-lg text-sm`}
        >
          💡 With Cash on Delivery, you pay the full amount (including shipping)
          when you receive your order.
        </div>
      )}

      {selectedPayment.title === "bKash" && (
        <div
          className={`${getInfoColorClasses(
            selectedPayment.color
          )} px-4 py-3 rounded-lg text-sm`}
        >
          🟢 bKash - Send money to complete your payment. You'll receive payment
          details on the next page.
        </div>
      )}

      {selectedPayment.title === "Nagad" && (
        <div
          className={`${getInfoColorClasses(
            selectedPayment.color
          )} px-4 py-3 rounded-lg text-sm`}
        >
          🧡 Nagad - Send money to complete your payment. You'll receive payment
          details on the next page.
        </div>
      )}

      {selectedPayment.title === "Rocket" && (
        <div
          className={`${getInfoColorClasses(
            selectedPayment.color
          )} px-4 py-3 rounded-lg text-sm`}
        >
          🚀 Rocket - Send money to complete your payment. You'll receive
          payment details on the next page.
        </div>
      )}
    </div>
  );
}
