"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { doSignOut } from "../backend/actions";

export default function LogOutButton({ isOpen, setIsOpen }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <li className="flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-all duration-200 cursor-pointer group">
        <LogOut className="h-4 w-4" />
        Log Out
      </li>
    );
  }

  return (
    <li
      onClick={async () => {
        try {
          await doSignOut();
          setIsOpen(false);
        } catch (error) {
          console.error("Sign out failed:", error);
          // You might want to show an error message to the user
        }
      }}
      className="flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-all duration-200 cursor-pointer group"
    >
      <LogOut className="h-4 w-4" />
      Log Out
    </li>
  );
}
