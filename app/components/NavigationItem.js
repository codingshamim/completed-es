// NavigationItem.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationItem({
  target,
  label,
  children,
  isMobile = false,
}) {
  const pathName = usePathname();
  const isActive = pathName === target;

  if (isMobile) {
    return (
      <Link
        href={target}
        className="flex flex-col items-center justify-center flex-1 py-2 transition-colors"
      >
        <div className="relative w-6 h-6 flex items-center justify-center mb-1">
          <div className={`${isActive ? "text-white" : "text-gray-400"}`}>
            {children}
          </div>
          {isActive && (
            <div className="absolute -bottom-2 w-2 h-2 bg-white rounded-full" />
          )}
        </div>
        <span
          className={`text-[10px] font-medium ${
            isActive ? "text-white" : "text-gray-400"
          }`}
        >
          {label}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={target}
      className={`flex flex-col items-center justify-center relative min-w-[70px] py-1.5 rounded-xl transition-all duration-200 ${
        isActive ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center mb-1">
        <div className={isActive ? "text-white" : "text-gray-400"}>
          {children}
        </div>
      </div>
      <span
        className={`text-xs font-medium whitespace-nowrap ${
          isActive ? "text-white" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
