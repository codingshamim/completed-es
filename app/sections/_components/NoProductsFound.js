import Link from "next/link";
import TryAgainButton from "./TryAgainButton";

/* eslint-disable react/no-unescaped-entities */
export default function NoProductsFound() {
  return (
    <div className="bg-black text-white py-20 px-6 text-center min-h-[400px] flex flex-col items-center justify-center">
      {/* Icon Container */}
      <div className="relative mb-8">
        <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-gray-700 rounded-full flex items-center justify-center mb-4 relative">
          <svg
            className="w-12 h-12 md:w-16 md:h-16 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9h.01M9 12h.01M9 15h.01M15 9h.01M15 12h.01M15 15h.01"
            />
          </svg>
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 border border-gray-600 rounded-full blur-lg opacity-20"></div>
      </div>

      {/* Main Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        No Products Found
      </h2>

      <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
        We couldn't find any products matching your criteria. Try adjusting your
        filters or search terms.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <TryAgainButton />
      </div>

      {/* Decorative Elements */}
      <div className="flex justify-center items-center gap-2 mt-12 opacity-50">
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
}
