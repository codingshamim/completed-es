"use client";

import { useFormStatus } from "react-dom";

export default function CheckoutButton({ totalItems }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full mt-6 bg-white text-black py-3 font-medium hover:bg-gray-200 transition disabled:opacity-50"
      disabled={pending}
    >
      {pending ? (
        <span className="flex justify-center items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Processing...
        </span>
      ) : (
        `Place Order (${totalItems})`
      )}
    </button>
  );
}
