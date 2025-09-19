"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationItem({ target, label, children }) {
  const pathName = usePathname();
  const isActive = pathName === target;
  return (
    <Link
      href={target}
      className={`flex nav-item justify-center items-center relative ${
        isActive && "!w-[40px] !h-[40px] rounded-full bg-secondary"
      }`}
    >
      <label
        htmlFor=""
        className="absolute top-[-40px] left-[-20px] bg-white py-[2px] px-[6px] text-black rounded-sm text-xs"
      >
        {label}
      </label>
      {children}
    </Link>
  );
}
