"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/app/actions/category.action";

export default function Categories({ formData, handleCheckboxChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-sm">Loading categories...</p>;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Categories
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.category?.includes(category?.name)}
                onChange={() =>
                  handleCheckboxChange("category", category?.name)
                }
                className="sr-only"
              />
              <div
                className={`w-full py-2 px-4 rounded-lg border-2 text-center cursor-pointer transition-all duration-200 ${
                  formData.category.includes(category.name)
                    ? "border-blue-500 bg-transparent text-blue-400"
                    : "border-gray-600 bg-transparent text-gray-300 hover:border-gray-500"
                }`}
              >
                {category?.name}
              </div>
            </label>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No categories found</p>
        )}
      </div>
    </div>
  );
}
