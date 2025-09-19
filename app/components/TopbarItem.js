"use client";
import Link from "next/link";
import useCommonState from "../src/hooks/useCommonState";

export default function TopbarItem({ children, title, target }) {
  const { common, setCommon } = useCommonState();
  return (
    <li
      onClick={() =>
        setCommon({
          ...common,
          topbar: false,
        })
      }
      className="flex items-center gap-2 hover:bg-black w-full py-[2px] cursor-pointer px-2"
    >
      <Link className=" flex items-center gap-2 w-full" href={target}>
        {children}
        {title}
      </Link>
    </li>
  );
}
