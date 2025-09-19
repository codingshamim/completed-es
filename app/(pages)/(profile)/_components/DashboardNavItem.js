"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNavItem({ children, target }) {
  const pathName = usePathname();
  const isActive = target === pathName;

  return (
    <li>
      <Link
        href={target}
        className={`w-full h-full ${
          isActive
            ? "btn border  border-transparent"
            : "variable-btn nav-border"
        }  mt-4 cursor-pointer`}
      >
        {children}
      </Link>
    </li>
  );
}
