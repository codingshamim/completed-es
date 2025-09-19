"use client";

import { useEffect } from "react";
import useCommonState from "../src/hooks/useCommonState";

export default function ToastContainer() {
  const { common, setCommon } = useCommonState();
  useEffect(() => {
    if (common?.toast) {
      setTimeout(() => {
        setCommon({
          ...common,
          toast: false,
          toastMessage: "",
        });
      }, 3000);
    }
  });
  return (
    <div
      className={`fixed z-50 flex justify-center items-center transition-all duration-300 ${
        common?.toast
          ? "top-20 opacity-100"
          : "top-3 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-secondary flex justify-between items-center  shadow-lg py-2 px-4 rounded-lg text-white">
        <div className="flex items-center gap-2">
          {common?.toastSuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00fa9a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-check"
            >
              <circle cx={12} cy={12} r={10} />
              <path d="m9 12 2 2 4-4" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide stroke-red-600 lucide-circle-x"
            >
              <circle cx={12} cy={12} r={10} />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          )}
          {common?.toastMessage}
        </div>
        <svg
          onClick={() =>
            setCommon({
              ...common,
              toast: false,
              toastMessage: "",
            })
          }
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x cursor-pointer"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </div>
    </div>
  );
}
