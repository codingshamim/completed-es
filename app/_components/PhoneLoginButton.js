"use client";

import Link from "next/link";
import useCommonState from "../src/hooks/useCommonState";

export default function PhoneLoginButton() {
  const { common, setCommon } = useCommonState();
  return (
    <Link
      onClick={() => setCommon({ ...common, loginModal: false })}
      href="/login"
      className="w-full bg-black hover:bg-secondary hover:border-transparent text-white  py-3 px-6 rounded-sm flex items-center justify-center gap-3 transition-all duration-200  active:scale-95 border border-gray-700 hover:border-gray-600  "
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
      <span className="text-base bangla-font">ফোন নম্বর দিয়ে লগিন করুন</span>
    </Link>
  );
}
