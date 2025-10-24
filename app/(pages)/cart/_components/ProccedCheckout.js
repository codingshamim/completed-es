"use client";

import useCommonState from "@/app/src/hooks/useCommonState";
import { useRouter } from "next/navigation";

export default function ProccedCheckout({ items, carts }) {
  const { setCheckout } = useCommonState();
  const router = useRouter();
  return (
    <button
      className="btn bangla-font w-full !py-2 flex items-center gap-2 justify-center active:scale-[98%] transition-all duration-300"
      onClick={() => {
        setCheckout(carts);
        router.push("/checkout");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shopping-basket-icon lucide-shopping-basket"
      >
        <path d="m15 11-1 9" />
        <path d="m19 11-4-7" />
        <path d="M2 11h20" />
        <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
        <path d="M4.5 15.5h15" />
        <path d="m5 11 4-7" />
        <path d="m9 11 1 9" />
      </svg>
      চেকআউটে এগিয়ে যান({items})
    </button>
  );
}
