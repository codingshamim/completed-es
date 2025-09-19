"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function SidebarContainer({ children }) {
  const { common } = useCommonState();
  const isHamburgerOpen = common.hamburger;

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-40 w-64
        bg-secondary border-r border-gray-700
        transition-all duration-300 ease-in-out
        transform
        ${isHamburgerOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {children}
    </div>
  );
}
