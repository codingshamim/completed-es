"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CartAction({ count }) {
  const pathName = usePathname();
  const isActive = pathName === "/cart";
  return (
    <Link
      href="/cart"
      className={`flex nav-item cart-item justify-center items-center relative ${
        isActive && "bg-secondary rounded-full !w-[40px] h-[40px]"
      }`}
    >
      <label
        htmlFor=""
        className="absolute top-[-10px] right-[-10px] bg-white w-[20px] h-[20px] rounded-full text-black text-xs flex justify-center items-center"
      >
        {count}
      </label>
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
        className="lucide lucide-shopping-cart"
      >
        <circle cx={8} cy={21} r={1} />
        <circle cx={19} cy={21} r={1} />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    </Link>
  );
}
