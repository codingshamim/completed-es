import mainPrice from "@/helpers/mainPrice";

export default function OrderSummary({ total, shippingOption }) {
  return (
    <div className=" rounded-lg border border-gray-800">
      <div className="p-6 border-b border-gray-800 ">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-receipt-icon lucide-receipt"
            >
              <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 17.5v-11" />
            </svg>
          </div>
          Order Summary
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between text-gray-300 text-base">
            <span>Subtotal:</span>
            <span className="font-semibold">{mainPrice(total)}</span>
          </div>
          <div className="flex justify-between text-gray-300 text-base">
            <span>Shipping ({shippingOption?.title || ""}):</span>
            <span className="font-semibold">
              {mainPrice(shippingOption?.fee || 0)}
            </span>
          </div>
          <div className="flex justify-between text-gray-300 text-base">
            <span>Discount:</span>
            <span className="text-green-400 font-semibold">-৳0.00</span>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between text-2xl font-bold text-white">
              <span>Total:</span>
              <span className="text-green-400">
                {mainPrice(total + (shippingOption?.fee || 0))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
