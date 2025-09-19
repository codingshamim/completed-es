"use client";

import useCommonState from "@/app/src/hooks/useCommonState";
import mainPrice from "@/helpers/mainPrice";

const shippingOptions = [
  {
    title: "Inside of Dhaka",
    fee: 40,
  },
  {
    title: "Outside of Dhaka",
    fee: 120,
  },
];

export default function ShippingOption() {
  const { common, setCommon } = useCommonState();

  // handle change
  const handleChange = (e) => {
    const selectedTitle = e.target.value;
    const selectedOption = shippingOptions.find(
      (opt) => opt.title === selectedTitle
    );

    setCommon({
      ...common,
      selectedShippingOption: selectedOption,
    });
  };

  return (
    <div className="bg-black border border-gray-700 rounded-lg">
      <div className="bg-black px-6 py-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Shipping Option</h2>
      </div>
      <div className="p-6">
        <select
          value={common?.selectedShippingOption?.title || ""}
          onChange={handleChange}
          className="w-full bg-black border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            Select Shipping Option
          </option>
          {shippingOptions.map((option, index) => (
            <option key={index} value={option.title}>
              {option.title} - {mainPrice(option.fee)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
