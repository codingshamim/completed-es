"use client";

import useCommonState from "@/app/src/hooks/useCommonState";
import mainPrice from "@/helpers/mainPrice";
import Image from "next/image";
import Link from "next/link";

// Dummy payment methods data

export default function PaymentModal() {
  const { common, setCommon } = useCommonState();
  if (!common?.paymentModal.isOpen) return null;

  const getPaymentTypeLabel = (type) => {
    switch (type) {
      case "internetbanking":
        return "Internet Banking";
      case "mobilebanking":
        return "Mobile Banking";
      case "creditcard":
        return "Credit Card";
      default:
        return "Payment Method";
    }
  };
  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`);
    setImageError(true);
    setIsLoading(false);
  };
  const generateBlurDataURL = (width = 40, height = 40) => {
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <rect x="25%" y="25%" width="50%" height="50%" fill="#2a2a2a" opacity="0.5"/>
    </svg>`
    ).toString("base64")}`;
  };
  const onClose = () => {
    setCommon({
      ...common,
      paymentModal: {
        isOpen: false,
      },
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal Content */}
      <div className="relative w-full max-w-md mx-4 bg-black rounded-2xl border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Select Payment Method
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Choose your preferred payment option
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </div>

        {/* Amount Display */}
        <div className="px-6 py-4 bg-black border border-t-transparent border-l-transparent border-r-transparent border-gray-800">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Amount:</span>
            <span className="text-2xl font-bold text-green-400">
              {mainPrice(common?.paymentModal?.totalPrice)}
            </span>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {common?.paymentModal?.paymentMethods.map((method, index) => (
              <Link
                href={method?.redirectGatewayURL || ""}
                key={index}
                className="flex items-center p-4 rounded-sm bg-black hover:bg-secondary cursor-pointer transition-all duration-200 border border-gray-700 hover:border-gray-600 group"
              >
                {/* Payment Logo */}
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-sm flex items-center justify-center mr-4">
                  <Image
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    src={method.logo}
                    alt={method.name}
                    placeholder="blur"
                    blurDataURL={generateBlurDataURL()}
                    onError={handleImageError}
                    style={{
                      objectPosition: "center",
                    }}
                    width={48}
                    height={48}
                  />
                </div>

                {/* Payment Info */}
                <div className="flex-1">
                  <h3 className="font-medium text-white capitalize group-hover:text-green-400 transition-colors">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {getPaymentTypeLabel(method.type)}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="text-gray-500 group-hover:text-green-400 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>Fast Processing</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
