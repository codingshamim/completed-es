/* eslint-disable react/no-unescaped-entities */
"use client"; // Error boundaries must be Client Components

import { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error boundary caught:", error);
    setErrorDetails(error?.message || "An unexpected error occurred");
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="size-20 mx-auto bg-red-600/20 rounded-full flex items-center justify-center">
            <svg
              className="size-10 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-400 text-lg">
              We encountered an unexpected error. Don't worry, we're on it!
            </p>
          </div>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && errorDetails && (
            <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-4 text-left">
              <p className="text-red-300 text-sm font-mono break-words">
                {errorDetails}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => reset()}
              className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              Try Again
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-transparent text-gray-300 font-medium py-3 px-6 rounded-lg border border-gray-700 hover:bg-gray-900 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Go Home
            </button>
          </div>

          {/* Support Info */}
          <div className="pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
