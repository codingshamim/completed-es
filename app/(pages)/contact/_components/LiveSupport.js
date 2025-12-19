"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function LiveSupport() {
  const { common, setCommon } = useCommonState();
  return (
    <button
      onClick={() => {
        setCommon({
          ...common,
          chatModal: true,
        });
      }}
      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg shadow-md bg-black border border-gray-800 text-white hover:scale-105 transition-transform"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={25}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-square-icon lucide-message-square"
      >
        <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
      </svg>
      Live Support
    </button>
  );
}
