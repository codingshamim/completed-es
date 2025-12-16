"use client";

import { useTransition } from "react";
import { facebookLoginAction } from "../backend/actions/login.action";
import useCommonState from "../src/hooks/useCommonState";

export default function FacebookLogin() {
  const [isPending, startTransition] = useTransition();
  const { common, setCommon } = useCommonState();

  const handleClick = () => {
    startTransition(async () => {
      await facebookLoginAction();
      setCommon({ ...common, loginModal: false });
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      type="button"
      className="w-full bg-[#1877F2] hover:bg-[#1664D9] text-white py-3 px-6 rounded-sm flex items-center justify-center gap-3 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <>
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span className="text-base bangla-font">
            ফেসবুকের সাথে সংযোগ করা হচ্ছে...
          </span>
        </>
      ) : (
        <>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="text-base bangla-font">ফেসবুক দিয়ে লগিন করুন</span>
        </>
      )}
    </button>
  );
}
