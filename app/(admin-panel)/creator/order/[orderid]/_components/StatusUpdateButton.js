"use client";

import { useEffect, useState } from "react";
import { updateStatus } from "@/app/actions/order.action";

export default function StatusUpdateButton({
  orderId,
  customClass = "",
  status,
  title,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleStatus = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await updateStatus(orderId, status);

      if (response?.error) {
        setError(response.message || "Something went wrong!");
      } else {
        setSuccess(response.message || "Status updated successfully!");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const removeSuccessMessage = () => setSuccess("");
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        removeSuccessMessage();
      }, 2000);
    }
  }, [orderId, status, success]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={handleStatus}
        disabled={loading}
        className={`w-full ${customClass} ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        } text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          title
        )}
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">{success}</p>}
    </div>
  );
}
