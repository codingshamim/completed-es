"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

const paymentOptions = ["Bkash", "Nagad", "Rocket"];

export default function PaymentMethods() {
  const { common, setCommon } = useCommonState();

  const handleChange = (e) => {
    setCommon({
      ...common,
      paymentMethod: e.target.value,
    });
  };

  return (
    <div className="bg-black border border-gray-700 rounded-lg">
      <div className="bg-black px-6 py-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Payment Method</h2>
      </div>
      <div className="p-6">
        <select
          value={common?.paymentMethod || ""}
          onChange={handleChange}
          className="w-full bg-black border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            Select Payment Method
          </option>
          {paymentOptions.map((method, index) => (
            <option key={index} value={method}>
              {method}
            </option>
          ))}
        </select>
        <p className="text-gray-400 text-sm mt-2">1-2 business days</p>
      </div>
    </div>
  );
}
