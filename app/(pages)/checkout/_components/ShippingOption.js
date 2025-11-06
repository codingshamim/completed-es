/* eslint-disable react/no-unescaped-entities */
"use client";

import useCommonState from "@/app/src/hooks/useCommonState";
import mainPrice from "@/helpers/mainPrice";
import { useState, useCallback, useEffect } from "react";

export default function ShippingOption() {
  const [shippingOptions] = useState([
    {
      title: "Inside of Dhaka",
      fee: 40,
    },
    {
      title: "Outside of Dhaka",
      fee: 120,
    },
  ]);

  const { common, setCommon } = useCommonState();

  // Auto-select shipping option based on delivery district
  useEffect(() => {
    if (common?.deliveryDistrict) {
      const districtLower = common.deliveryDistrict.toLowerCase();
      const isDhaka = districtLower === "dhaka" || districtLower === "ঢাকা";

      const selectedOption = isDhaka ? shippingOptions[0] : shippingOptions[1];

      setCommon((prev) => ({
        ...prev,
        shippingOption: selectedOption,
      }));
    } else {
      // Default to Inside Dhaka if no district selected
      if (!common?.shippingOption) {
        setCommon((prev) => ({
          ...prev,
          shippingOption: shippingOptions[0],
        }));
      }
    }
  }, [
    common?.deliveryDistrict,
    setCommon,
    shippingOptions,
    common?.shippingOption,
  ]);

  // Handle manual shipping option selection (only works when district not selected)
  const handleShippingChange = useCallback(
    (event) => {
      if (common?.deliveryDistrict) {
        // Prevent manual change when district is selected
        return;
      }

      const selectedIndex = parseInt(event.target.value);
      const selectedOption = shippingOptions[selectedIndex];
      setCommon((prev) => ({
        ...prev,
        shippingOption: selectedOption,
      }));
    },
    [shippingOptions, setCommon, common?.deliveryDistrict]
  );

  // Get current selected index for display
  const getCurrentSelectedIndex = () => {
    if (!common?.shippingOption) return 0;
    return shippingOptions.findIndex(
      (option) => option.title === common.shippingOption.title
    );
  };

  // Check if district is selected
  const isDistrictSelected = Boolean(common?.deliveryDistrict);

  return (
    <div className="border border-gray-700 p-4">
      <h2 className="font-semibold text-lg mb-2 bangla-font">ডেলিভারি চার্জ</h2>

      <select
        name="shippingOption"
        onChange={handleShippingChange}
        className={`bg-black border px-4 py-2 w-full text-white text-sm focus:outline-none transition-colors ${
          isDistrictSelected
            ? "border-gray-500 cursor-not-allowed opacity-60"
            : "border-gray-600 focus:border-white"
        }`}
        value={getCurrentSelectedIndex()}
        disabled={isDistrictSelected}
      >
        {shippingOptions.map((shipping, index) => (
          <option key={index} value={index}>
            {shipping?.title} - {mainPrice(shipping?.fee)}
          </option>
        ))}
      </select>

      {isDistrictSelected && (
        <div className="mt-2 text-xs text-yellow-400 bangla-font">
          ℹ️ জেলা নির্বাচনের উপর ভিত্তি করে শিপিং স্বয়ংক্রিয়ভাবে সেট করা
          হয়েছে
        </div>
      )}

      {common?.shippingOption && (
        <div className="mt-3 bg-secondary p-3 rounded text-sm">
          <div className="text-gray-300 bangla-font">নির্বাচিত শিপিং:</div>
          <div className="text-white font-medium">
            {common.shippingOption.title} -{" "}
            {mainPrice(common.shippingOption.fee)}
          </div>
        </div>
      )}
    </div>
  );
}
