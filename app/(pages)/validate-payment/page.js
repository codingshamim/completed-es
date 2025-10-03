import { getOrderTotalAmount, isPay } from "@/app/actions/order2.action";
import mainPrice from "@/helpers/mainPrice";
import { redirect } from "next/navigation";
import Header from "./_components/Header";

import PaymentMethods from "./_components/PaymentMethods";
import Form from "./_components/Form";
export const metadata = {
  title: "Esvibes - Validate Payment",
};
/* eslint-disable react/no-unescaped-entities */
const paymentMethodInfo = {
  cod: {
    title: "Cash on Delivery",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={35}
        height={35}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-hand-coins-icon lucide-hand-coins"
      >
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 16 6 6" />
        <circle cx={16} cy={9} r="2.9" />
        <circle cx={6} cy={5} r={3} />
      </svg>
    ),
    color: "blue",
    description:
      "Your order has been confirmed! Pay when you receive your order.",
  },
  bkash: {
    title: "bKash",
    icon: (
      <svg
        width={35}
        height={35}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
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
                  ".bkash-path{fill:none;stroke:#e2136e;stroke-linecap:round;stroke-linejoin:round;}",
              }}
            />
          </defs>
          <path
            className="bkash-path"
            d="M22.9814,8.6317s-4.1632,14.704-3.8089,14.704,16.4755,2.923,16.4755,2.923Z"
          />
          <polyline
            className="bkash-path"
            points="22.981 8.632 6.329 6.152 19.172 23.336 21.387 33.522 35.648 26.259 39.368 17.445 30.393 18.946"
          />
          <polyline
            className="bkash-path"
            points="37.929 20.855 43 20.855 39.368 17.445"
          />
          <polyline
            className="bkash-path"
            points="21.387 33.522 21.741 35.427 13.725 41.848 19.172 23.336"
          />
          <polyline
            className="bkash-path"
            points="35.648 26.259 35.117 29.138 22.848 32.778"
          />
          <polyline
            className="bkash-path"
            points="8.455 8.997 5 8.997 16.044 19.15"
          />
        </g>
      </svg>
    ),
    color: "pink",
    description: "Complete your payment using bKash mobile wallet",
    accountNumber: "01XXXXXXXXX",
    qrData: "bkash://pay?amount=100&merchant=01XXXXXXXXX&ref=",
  },
  nagad: {
    title: "Nagad",
    icon: (
      <svg
        width={32}
        height={32}
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
    color: "orange",
    description: "Complete your payment using Nagad mobile wallet",
    accountNumber: "01XXXXXXXXX",
    qrData: "nagad://pay?amount=100&merchant=01XXXXXXXXX&ref=",
  },
  rocket: {
    title: "Rocket",
    icon: "🚀",
    color: "purple",
    description: "Complete your payment using Rocket mobile wallet",
    accountNumber: "01XXXXXXXXX",
    qrData: "rocket://pay?amount=100&merchant=01XXXXXXXXX&ref=",
  },
};

// Simple QR Code generator component (using a basic pattern approach)
const QRCode = ({ value, size = 200 }) => {
  // In a real implementation, you'd use a proper QR code library like 'qrcode' or 'react-qr-code'
  // For demonstration, we'll create a placeholder QR pattern
  const createQRPattern = () => {
    const cells = [];
    const gridSize = 25;

    for (let i = 0; i < gridSize * gridSize; i++) {
      // Create a pseudo-random pattern based on the value
      const hash = value.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);

      const shouldFill = (hash + i) % 3 === 0;
      cells.push(shouldFill);
    }

    return cells;
  };

  const pattern = createQRPattern();
  const cellSize = size / 25;

  return (
    <div className="bg-white p-4 rounded-lg inline-block">
      <svg width={size} height={size} className="border">
        {pattern.map((filled, index) => {
          const row = Math.floor(index / 25);
          const col = index % 25;
          return (
            <rect
              key={index}
              x={col * cellSize}
              y={row * cellSize}
              width={cellSize}
              height={cellSize}
              fill={filled ? "#000" : "#fff"}
            />
          );
        })}
        {/* Add positioning squares (corners) */}
        <rect
          x="0"
          y="0"
          width={cellSize * 7}
          height={cellSize * 7}
          fill="#000"
        />
        <rect
          x={cellSize}
          y={cellSize}
          width={cellSize * 5}
          height={cellSize * 5}
          fill="#fff"
        />
        <rect
          x={cellSize * 2}
          y={cellSize * 2}
          width={cellSize * 3}
          height={cellSize * 3}
          fill="#000"
        />

        <rect
          x={size - cellSize * 7}
          y="0"
          width={cellSize * 7}
          height={cellSize * 7}
          fill="#000"
        />
        <rect
          x={size - cellSize * 6}
          y={cellSize}
          width={cellSize * 5}
          height={cellSize * 5}
          fill="#fff"
        />
        <rect
          x={size - cellSize * 5}
          y={cellSize * 2}
          width={cellSize * 3}
          height={cellSize * 3}
          fill="#000"
        />

        <rect
          x="0"
          y={size - cellSize * 7}
          width={cellSize * 7}
          height={cellSize * 7}
          fill="#000"
        />
        <rect
          x={cellSize}
          y={size - cellSize * 6}
          width={cellSize * 5}
          height={cellSize * 5}
          fill="#fff"
        />
        <rect
          x={cellSize * 2}
          y={size - cellSize * 5}
          width={cellSize * 3}
          height={cellSize * 3}
          fill="#000"
        />
      </svg>
    </div>
  );
};

export default async function ValidatePaymentPage({ searchParams }) {
  const params = await searchParams;
  const orderTransactionId = params?.transaction;
  const paymentMethod = params?.method || "bkash";

  const currentPaymentInfo =
    paymentMethodInfo[paymentMethod] || paymentMethodInfo.bkash;
  // check if already paid
  const isAlreadyPaid = await isPay(orderTransactionId);
  if (isAlreadyPaid?.isPayThisOrder) {
    redirect("/");
  }

  // Payment amounts
  const {
    totalAmount,
    shippingFee,
    method: orderPaymentMethod,
  } = await getOrderTotalAmount(orderTransactionId);

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-900/20 border-blue-500/30 text-blue-300",
      pink: "bg-pink-900/20 border-pink-500/30 text-pink-300",
      orange: "bg-orange-900/20 border-orange-500/30 text-orange-300",
      purple: "bg-purple-900/20 border-purple-500/30 text-purple-300",
    };
    return colors[color] || colors.blue;
  };

  const getBorderColorClasses = (color) => {
    const colors = {
      blue: "border-blue-500",
      pink: "border-pink-500",
      orange: "border-orange-500",
      purple: "border-purple-500",
    };
    return colors[color] || colors.blue;
  };

  // Redirect case - in real implementation, use Next.js redirect()
  if (!orderTransactionId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Header orderTransactionId={orderTransactionId} />

        {/* Payment Amount Summary */}
        <div className="bg-black border border-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Payment Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Product Amount:</span>
              <span>{mainPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Shipping Fee (Pay on Delivery):</span>
              <span>{mainPrice(shippingFee) || 0}</span>
            </div>
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="flex justify-between text-white font-semibold text-lg">
                <span>Total Amount:</span>
                <span>{mainPrice(totalAmount + shippingFee) || 0}</span>
              </div>
            </div>
            {orderPaymentMethod === "cod" && (
              <p className="text-sm text-gray-400 mt-2">
                💡 You'll pay{" "}
                <span className="font-bold">{mainPrice(shippingFee) || 0}</span>{" "}
                shipping fee when you receive your order
              </p>
            )}
          </div>
        </div>

        {/* Payment Method Info */}
        <div
          className={`${getColorClasses(
            currentPaymentInfo.color
          )} ${getBorderColorClasses(
            currentPaymentInfo.color
          )} border rounded-lg p-6 mb-6`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{currentPaymentInfo.icon}</span>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {currentPaymentInfo.title}
              </h2>
              <p className="text-gray-300 text-sm">
                {currentPaymentInfo.description}
              </p>
            </div>
          </div>

          {currentPaymentInfo.accountNumber && (
            <div className="bg-black/50 rounded p-4 mb-4">
              {/* QR Code Section */}
              {currentPaymentInfo.qrData && (
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-300 mb-3">
                    📱 Scan QR Code to Pay Instantly
                  </p>
                  <div className="flex justify-center mb-3">
                    <QRCode
                      value={`${currentPaymentInfo.qrData}${orderTransactionId}`}
                      size={180}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    Open your {currentPaymentInfo.title} app and scan this QR
                    code
                  </p>

                  <div className="border-t border-gray-600 pt-4 mt-4">
                    <p className="text-xs text-gray-300 mb-2">
                      OR Send Money Manually:
                    </p>
                  </div>
                </div>
              )}

              {/* Manual Payment Info */}
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-300 mb-1">Send money to:</p>
                  <p className="text-lg font-mono text-white">
                    {currentPaymentInfo.accountNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">
                    {mainPrice(
                      orderPaymentMethod === "cod"
                        ? shippingFee
                        : totalAmount + shippingFee
                    ) || 0}
                  </p>
                  <p className="text-xs text-gray-400">Amount</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Use "Send Money" option in your {currentPaymentInfo.title} app
              </p>
            </div>
          )}
        </div>
        {paymentMethod === "cod" && (
          <div className="bg-black border border-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Pay Shipping Fee Online
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              You can pay the shipping fee {mainPrice(shippingFee)} in advance
              using your preferred mobile wallet:
            </p>

            <PaymentMethods orderTransactionId={orderTransactionId} />
          </div>
        )}
        {/* Form */}
        {paymentMethod !== "cod" && (
          <Form
            currentPaymentInfo={currentPaymentInfo}
            orderTransactionId={orderTransactionId}
            totalAmount={totalAmount}
            shippingFee={shippingFee}
            paymentMethod={orderPaymentMethod}
          />
        )}

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Having trouble? Contact us at{" "}
            <a href="tel:+8801XXXXXXXXX" className="text-white hover:underline">
              +880 1XXX-XXXXXX
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
