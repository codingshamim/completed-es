"use client";

import { useState, useCallback } from "react";
import districts from "@/database/districts.json";
import cities from "@/database/cities.json";
import postcodes from "@/database/postcodes.json";

export default function ShippingAddress() {
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);
  const [postalCode, setPostalCode] = useState("");

  const handleDistrictChange = useCallback((e) => {
    const value = e.target.value;

    if (value) {
      const selected = districts.find((d) => d.name === value);
      if (selected) {
        setSelectedDistrictId(selected.id);
        const matchedCities = cities.filter(
          (city) => city.district_id === selected.id
        );
        setFilteredCities(matchedCities);
        setPostalCode("");
      }
    } else {
      setFilteredCities([]);
      setSelectedDistrictId(null);
      setPostalCode("");
    }
  }, []);

  const handleCityChange = useCallback(
    (e) => {
      const value = e.target.value;

      if (value && selectedDistrictId) {
        const matchedPostcode = postcodes.find(
          (p) =>
            p.district_id === selectedDistrictId &&
            p.upazila.toLowerCase() === value.toLowerCase()
        );
        setPostalCode(matchedPostcode?.postCode || "");
      }
    },
    [selectedDistrictId]
  );

  return (
    <div className="bg-black border border-gray-700 rounded-lg">
      <div className="bg-black px-6 py-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Shipping Address</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            className="bg-black border border-gray-600 rounded-lg px-4 py-3 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (01XXXXXXXXX) *"
            className="bg-black border border-gray-600 rounded-lg px-4 py-3 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="district"
            onChange={handleDistrictChange}
            className="bg-black border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select District *
            </option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>

          <select
            name="city"
            onChange={handleCityChange}
            className="bg-black border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            defaultValue=""
            disabled={filteredCities.length === 0}
          >
            <option value="" disabled>
              {filteredCities.length === 0
                ? "Select District First"
                : "Select City *"}
            </option>
            {filteredCities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code (Optional)"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="w-full bg-black border border-gray-600 rounded-lg px-4 py-3 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500"
        />

        <textarea
          placeholder="Detailed Address *"
          rows={3}
          name="address"
          className="w-full bg-black border border-gray-600 rounded-lg px-4 py-3 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>
    </div>
  );
}
