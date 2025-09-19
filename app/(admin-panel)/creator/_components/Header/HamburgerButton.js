"use client"

import useCommonState from "@/app/src/hooks/useCommonState"
import { set } from "mongoose"

export default function HamburgerButton() {
    const {common,setCommon} = useCommonState()
  return (
      <button
          onClick={()=>setCommon({...common,hamburger:!common.hamburger})}
          className="lg:hidden text-gray-400 hover:text-white"
        >
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
            className="lucide lucide-menu"
          >
            <path d="M4 12h16" />
            <path d="M4 18h16" />
            <path d="M4 6h16" />
          </svg>
        </button>
  )
}