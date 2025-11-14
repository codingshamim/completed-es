// CartAction.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CartAction({ count, isMobile = false }) {
  const pathName = usePathname();
  const isActive = pathName === "/cart";

  if (isMobile) {
    return (
      <Link
        href="/cart"
        className="flex flex-col items-center justify-center flex-1 py-2 transition-colors relative"
      >
        <div className="relative w-6 h-6 flex items-center justify-center mb-1">
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
              {count > 9 ? "9+" : count}
            </span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${isActive ? "text-white" : "text-gray-400"}`}
          >
            <circle cx={8} cy={21} r={1} />
            <circle cx={19} cy={21} r={1} />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          {isActive && (
            <div className="absolute -bottom-2 w-2 h-2 bg-white rounded-full" />
          )}
        </div>
        <span
          className={`text-[10px] font-medium ${
            isActive ? "text-white" : "text-gray-400"
          }`}
        >
          Cart
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/cart"
      className={`flex flex-col items-center justify-center relative min-w-[70px] py-1.5 rounded-xl transition-all duration-200 ${
        isActive ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center mb-1">
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-semibold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${isActive ? "text-white" : "text-gray-400"}`}
        >
          <circle cx={8} cy={21} r={1} />
          <circle cx={19} cy={21} r={1} />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      </div>
      <span
        className={`text-xs font-medium whitespace-nowrap ${
          isActive ? "text-white" : "text-gray-400"
        }`}
      >
        Cart
      </span>
    </Link>
  );
}
