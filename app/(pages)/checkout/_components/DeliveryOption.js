/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";

const paymentOptions = [
  {
    id: 1,
    title: "Cash on Delivery",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-banknote-arrow-down-icon lucide-banknote-arrow-down"
      >
        <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
        <path d="m16 19 3 3 3-3" />
        <path d="M18 12h.01" />
        <path d="M19 16v6" />
        <path d="M6 12h.01" />
        <circle cx={12} cy={12} r={2} />
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
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        widht={30}
        height={30}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <defs>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  ".a{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;}",
              }}
            />
          </defs>
          <path
            className="a"
            d="M22.9814,8.6317s-4.1632,14.704-3.8089,14.704,16.4755,2.923,16.4755,2.923Z"
          />
          <polyline
            className="a"
            points="22.981 8.632 6.329 6.152 19.172 23.336 21.387 33.522 35.648 26.259 39.368 17.445 30.393 18.946"
          />
          <polyline
            className="a"
            points="37.929 20.855 43 20.855 39.368 17.445"
          />
          <polyline
            className="a"
            points="21.387 33.522 21.741 35.427 13.725 41.848 19.172 23.336"
          />
          <polyline
            className="a"
            points="35.648 26.259 35.117 29.138 22.848 32.778"
          />
          <polyline className="a" points="8.455 8.997 5 8.997 16.044 19.15" />
        </g>
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
        widht={30}
        height={30}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <defs>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  ".a{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;}",
              }}
            />
          </defs>
          <path
            className="a"
            d="M18.8808,6.3975A19.3468,19.3468,0,1,0,42.3963,19.3847"
          />
          <path
            className="a"
            d="M14.9194,25.893C14.8584,21.68,17.4842,13.8021,26.4,9.955L22.7968,3.5432C17.4231,6.169,10.2174,15.2066,14.9194,25.893Z"
          />
          <path
            className="a"
            d="M22.136,12.4087a16.7784,16.7784,0,0,0-2.9215,8.8424c1.8394-3.7912,7.7259-9.6477,17.4192-9.0767l-.3362-7.347A17.9936,17.9936,0,0,0,25.6848,8.683"
          />
          <path
            className="a"
            d="M34.4651,12.1527A16.506,16.506,0,0,0,23.896,20.28c3.3473-2.56,11.238-5.1453,19.64-.2781l3.0022-6.7141a17.7464,17.7464,0,0,0-9.9239-1.5322"
          />
          <path
            className="a"
            d="M13.4377,20.0692a11.6039,11.6039,0,1,0,19.0467-2.7711"
          />
        </g>
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
function getPaymentBanglaName(method) {
  switch (method) {
    case "Cash on Delivery":
      return "ক্যাশ অন ডেলিভারি";
    case "bKash":
      return "বিকাশ";
    case "Nagad":
      return "নগদ";
    case "Rocket":
      return "রকেট";
    default:
      return method;
  }
}

function getPaymentDescriptionBanglaname(method) {
  switch (method) {
    case "Cash on Delivery":
      return "আপনার অর্ডার পৌঁছানোর সময় অর্থ প্রদান করুন";
    case "bKash":
      return "বিকাশ মোবাইল ওয়ালেট ব্যবহার করে অর্থ প্রদান করুন";
    case "Nagad":
      return "নগদ মোবাইল ওয়ালেট ব্যবহার করে অর্থ প্রদান করুন";
    case "Rocket":
      return "রকেট মোবাইল ওয়ালেট ব্যবহার করে অর্থ প্রদান করুন";
    default:
      return method;
  }
}
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
      <h2 className="font-semibold text-lg mb-2 bangla-font">পেমেন্ট মেথড</h2>

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
                ({getPaymentBanglaName(payment.title)})
              </div>
              <div className="text-sm text-gray-400 mt-1 bangla-font">
                {getPaymentDescriptionBanglaname(payment.title)}
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
