"use client";

import { useState } from "react";

export default function SortItem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="variable-btn flex items-center gap-2 nav-border"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-up-down"
        >
          <path d="m21 16-4 4-4-4" />
          <path d="M17 20V4" />
          <path d="m3 8 4-4 4 4" />
          <path d="M7 4v16" />
        </svg>
        Sort
      </button>
      <ul
        className={`text-sm absolute w-full ${
          isOpen
            ? "translate-y-0 opacity-100"
            : " translate-y-[-10px] opacity-0"
        } transition-all duration-150`}
      >
        <li onClick={()=> setIsOpen(false)} className="variable-btn bg-black nav-border mt-2 cursor-pointer">
          A-Z
        </li>
        <li onClick={()=> setIsOpen(false)} className="variable-btn bg-black nav-border mt-2 cursor-pointer">
          Z-A
        </li>
      </ul>
    </div>
  );
}
