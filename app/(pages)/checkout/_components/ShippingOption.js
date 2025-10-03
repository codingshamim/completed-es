/* eslint-disable react/no-unescaped-entities */
"use client";

import useCommonState from "@/app/src/hooks/useCommonState";
import mainPrice from "@/helpers/mainPrice";
import { useState, useEffect, useCallback } from "react";

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
  const [isDetecting, setIsDetecting] = useState(true);
  const [detectionError, setDetectionError] = useState(null);

  // Function to check if location is in Dhaka district
  const isInDhakaDistrict = useCallback((lat, lng) => {
    // Dhaka district approximate boundaries
    const dhakaBounds = {
      north: 24.0,
      south: 23.6,
      east: 90.6,
      west: 90.2,
    };

    return (
      lat >= dhakaBounds.south &&
      lat <= dhakaBounds.north &&
      lng >= dhakaBounds.west &&
      lng <= dhakaBounds.east
    );
  }, []);

  // Set default shipping option
  const setDefaultShippingOption = useCallback(
    (index) => {
      const selectedOption = shippingOptions[index];
      setCommon((prev) => ({
        ...prev,
        shippingOption: selectedOption,
      }));
    },
    [shippingOptions, setCommon]
  );

  // Function to detect location and set shipping option
  const detectLocationAndSetShipping = useCallback(() => {
    if (!navigator.geolocation) {
      setDetectionError("Geolocation is not supported by this browser");
      setIsDetecting(false);
      // Default to outside Dhaka if geolocation not supported
      setDefaultShippingOption(1);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const isInside = isInDhakaDistrict(latitude, longitude);
        const selectedIndex = isInside ? 0 : 1; // 0 for inside, 1 for outside

        const selectedOption = shippingOptions[selectedIndex];
        setCommon((prev) => ({
          ...prev,
          shippingOption: selectedOption,
        }));

        setIsDetecting(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Location detection failed";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }

        setDetectionError(errorMessage);
        setIsDetecting(false);
        // Default to outside Dhaka on error
        setDefaultShippingOption(1);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  }, [isInDhakaDistrict, shippingOptions, setCommon, setDefaultShippingOption]);

  // Handle manual shipping option selection
  const handleShippingChange = useCallback(
    (event) => {
      const selectedIndex = parseInt(event.target.value);
      const selectedOption = shippingOptions[selectedIndex];

      setCommon((prev) => ({
        ...prev,
        shippingOption: selectedOption,
      }));
    },
    [shippingOptions, setCommon]
  );

  // Auto-detect location on component mount
  useEffect(() => {
    detectLocationAndSetShipping();
  }, [detectLocationAndSetShipping]);

  // Get current selected index for display
  const getCurrentSelectedIndex = () => {
    if (!common?.shippingOption) return 0;
    return shippingOptions.findIndex(
      (option) => option.title === common.shippingOption.title
    );
  };

  return (
    <div className="border border-gray-700 p-4">
      <h2 className="font-semibold text-lg mb-2">Shipping Option</h2>

      {/* Location detection status */}
      {isDetecting && (
        <div className="mb-3 text-sm text-blue-400 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-2"></div>
          Detecting your location...
        </div>
      )}

      {detectionError && (
        <div className="mb-3 text-sm text-yellow-400">
          ⚠️ {detectionError}. Defaulted to "Outside of Dhaka".
        </div>
      )}

      {!isDetecting && !detectionError && (
        <div className="mb-3 text-sm text-green-400">
          ✅ Location detected and shipping option set automatically
        </div>
      )}

      <select
        name="shippingOption"
        onChange={handleShippingChange}
        className="bg-black border border-gray-600 px-4 py-2 w-full text-white text-sm focus:border-white focus:outline-none"
        value={getCurrentSelectedIndex()}
      >
        {shippingOptions.map((shipping, index) => (
          <option key={index} value={index}>
            {shipping?.title} - {mainPrice(shipping?.fee)}
          </option>
        ))}
      </select>

      {/* Manual override option */}
      <div className="mt-3 text-sm text-gray-400">
        You can change the shipping option above if the auto-detection is
        incorrect.
      </div>

      {/* Retry button for failed detection */}
      {detectionError && (
        <button
          type="button"
          onClick={detectLocationAndSetShipping}
          className="mt-2 text-sm text-blue-400 hover:text-blue-300 underline"
        >
          Try detecting location again
        </button>
      )}

      {/* Selected shipping info */}
      {common?.shippingOption && (
        <div className="mt-3 bg-black border p-3 rounded text-sm">
          <div className="text-gray-300">Selected Shipping:</div>
          <div className="text-white font-medium">
            {common.shippingOption.title} -{" "}
            {mainPrice(common.shippingOption.fee)}
          </div>
        </div>
      )}
    </div>
  );
}
