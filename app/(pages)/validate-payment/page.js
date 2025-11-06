import { getOrderTotalAmount, isPay } from "@/app/actions/order2.action";
import mainPrice from "@/helpers/mainPrice";
import { redirect } from "next/navigation";
import Header from "./_components/Header";
import PaymentMethods from "./_components/PaymentMethods";
import Form from "./_components/Form";
import Link from "next/link";

export const metadata = {
  title: "Esvibes - Validate Payment",
};

/* eslint-disable react/no-unescaped-entities */
const paymentMethodInfo = {
  cod: {
    title: "Cash On Delivery",
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
        className="lucide lucide-hand-coins-icon lucide-hand-coins w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
      >
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 16 6 6" />
        <circle cx={16} cy={9} r="2.9" />
        <circle cx={6} cy={5} r={3} />
      </svg>
    ),
    color: "blue",
    description: "আপনার অর্ডার নিশ্চিত হয়েছে! পণ্য পাওয়ার সময় টাকা দিন।",
  },
  bkash: {
    title: "bkash",
    icon: (
      <svg
        width={35}
        height={35}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
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
    description: "বিকাশ মোবাইল ওয়ালেট ব্যবহার করে পেমেন্ট সম্পন্ন করুন",
    accountNumber: "01994844761",
    qrData: "bkash://pay?amount=100&merchant=01994844761&ref=",
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
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
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
    description: "নগদ মোবাইল ওয়ালেট ব্যবহার করে পেমেন্ট সম্পন্ন করুন",
    accountNumber: "01994844761",
    qrData: "nagad://pay?amount=100&merchant=01994844761&ref=",
  },
  rocket: {
    title: "Rocket",
    icon: <span className="text-2xl sm:text-3xl">🚀</span>,
    color: "purple",
    description: "রকেট মোবাইল ওয়ালেট ব্যবহার করে পেমেন্ট সম্পন্ন করুন",
    accountNumber: "019948447617",
    qrData: "rocket://pay?amount=100&merchant=019948447617&ref=",
  },
};

// Simple QR Code generator component
const QRCode = ({ value, size = 180 }) => {
  const createQRPattern = () => {
    const cells = [];
    const gridSize = 25;

    for (let i = 0; i < gridSize * gridSize; i++) {
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
    <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg inline-block">
      <svg
        width={size}
        height={size}
        className="border max-w-full h-auto"
        viewBox={`0 0 ${size} ${size}`}
      >
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

  // Redirect case
  if (!orderTransactionId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Header orderTransactionId={orderTransactionId} />

        {/* Payment Amount Summary */}
        <div className="bg-black border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 bangla-font">
            পেমেন্ট বিস্তারিত
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-300 text-sm sm:text-base">
              <span className="break-words pr-2 bangla-font">
                পণ্যের মূল্য:
              </span>
              <span className="whitespace-nowrap font-medium">
                {mainPrice(totalAmount)}
              </span>
            </div>
            <div className="flex justify-between text-gray-300 text-sm sm:text-base">
              <span className="break-words pr-2 bangla-font">
                ডেলিভারি চার্জ{" "}
                {orderPaymentMethod === "cod" ? "(পণ্য পাওয়ার আগে)" : ""}:
              </span>
              <span className="whitespace-nowrap font-medium">
                {mainPrice(shippingFee) || 0}
              </span>
            </div>
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="flex justify-between text-white font-semibold text-base sm:text-lg">
                <span className="bangla-font">মোট টাকা:</span>
                <span className="whitespace-nowrap">
                  {mainPrice(totalAmount + shippingFee) || 0}
                </span>
              </div>
            </div>
            {orderPaymentMethod === "cod" && (
              <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed bangla-font">
                💡 আপনি পণ্য পাওয়ার সময়{" "}
                <span className="font-bold">{mainPrice(totalAmount) || 0}</span>{" "}
                টাকা পণ্যের মূল্য দিবেন
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
          )} border rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6`}
        >
          <div className="flex items-start sm:items-center gap-3 mb-4">
            <span className="flex-shrink-0 mt-1 sm:mt-0">
              {currentPaymentInfo.icon}
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-white break-words bangla-font">
                {currentPaymentInfo.title}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed break-words bangla-font">
                {currentPaymentInfo.description}
              </p>
            </div>
          </div>

          {currentPaymentInfo.accountNumber && (
            <div className="bg-black/50 rounded p-3 sm:p-4 mb-4">
              {/* QR Code Section */}
              {currentPaymentInfo.qrData && (
                <div className="text-center mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-gray-300 mb-3 px-2 bangla-font">
                    📱 তাৎক্ষণিক পেমেন্ট করতে QR কোড স্ক্যান করুন
                  </p>
                  <div className="flex justify-center mb-3 overflow-hidden">
                    <QRCode
                      value={`${currentPaymentInfo.qrData}${orderTransactionId}`}
                      size={180}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mb-4 px-2 leading-relaxed bangla-font">
                    আপনার {currentPaymentInfo.title} অ্যাপ খুলুন এবং এই QR কোডটি
                    স্ক্যান করুন
                  </p>

                  <div className="border-t border-gray-600 pt-3 sm:pt-4 mt-3 sm:mt-4">
                    <p className="text-xs text-gray-300 mb-2 bangla-font">
                      অথবা ম্যানুয়ালি টাকা পাঠান:
                    </p>
                  </div>
                </div>
              )}

              {/* Manual Payment Info */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-300 mb-1 bangla-font">
                    এই নাম্বারে টাকা পাঠান:
                  </p>
                  <p className="text-base sm:text-lg font-mono text-white break-all">
                    {currentPaymentInfo.accountNumber}
                  </p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <p className="text-lg sm:text-xl font-bold text-green-400">
                    {mainPrice(
                      orderPaymentMethod === "cod"
                        ? shippingFee
                        : totalAmount + shippingFee
                    ) || 0}
                  </p>
                  <p className="text-xs text-gray-400 bangla-font">টাকা</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed bangla-font">
                আপনার {currentPaymentInfo.title} অ্যাপে "সেন্ড মানি" অপশন
                ব্যবহার করুন
              </p>
            </div>
          )}
        </div>

        {paymentMethod === "cod" && (
          <div className="bg-black border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 bangla-font">
              ডেলিভারি চার্জ অনলাইনে পরিশোধ করুন
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 leading-relaxed bangla-font">
              অনুগ্রহ করে {mainPrice(shippingFee)} টাকা ডেলিভারি চার্জ আপনার
              পছন্দের মোবাইল ওয়ালেটের মাধ্যমে আগে পরিশোধ করুন।
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
        <div className="mt-4 sm:mt-6 text-center px-3">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed bangla-font">
            সমস্যা হচ্ছে? আমাদের সাথে যোগাযোগ করুন{" "}
            <Link
              href="tel:+8801XXXXXXXXX"
              className="text-white hover:underline break-all inline-block"
            >
              +৮৮০ ১XXX-XXXXXX
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
