"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SidebarItem({ title, svg, items,target }) {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  return (
    <li>
      <button
        onClick={() => {
          items.length > 0 ? setOpen(!open) : router.push(target);
        }}
        className="nav-link w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-dark-700 hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2">
          {svg ? svg : ""}
          {title}
        </span>
        {items.length > 0 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-chevron-down transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>

      {/* Animated Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <ul className="ml-6 mt-1 space-y-1 pt-1">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
