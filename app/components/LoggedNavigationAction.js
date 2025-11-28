"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, User } from "lucide-react";
import { TopbarActionDat } from "../info/TopbarActionsJson";
import Link from "next/link";
import LogOutButton from "./LogOutButton";

export default function LoggedNavigationAction({ children, isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen && isMounted) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMounted]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen && isMounted) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isMounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="relative">
        <div className="cursor-pointer logged-in-user flex justify-center items-center gap-2 hover:opacity-80 transition-opacity">
          {children}
          <div className="cursor-pointer hidden md:block">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Trigger Button */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer logged-in-user flex justify-center items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {children}
        <div className="cursor-pointer hidden md:block">
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />
      )}

      {/* Modal */}
      <div
        ref={modalRef}
        className={`fixed z-50 transition-all duration-300 ease-out ${
          isOpen
            ? "top-20 opacity-100 scale-100 translate-y-0"
            : "top-16 opacity-0 scale-95 -translate-y-2 pointer-events-none"
        } right-4 md:right-60 w-72`}
      >
        <div className="bg-black border border-gray-700 rounded-xl shadow-2xl overflow-hidden backdrop-blur-lg">
          {/* Modal Header */}
          <div className="bg-black p-4 border-b border-gray-600">
            <h3 className="text-white bangla-font font-semibold text-sm flex items-center gap-2">
              <User className="h-4 w-4" />
              অ্যাকাউন্ট মেনু
            </h3>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <ul className="space-y-1">
              {TopbarActionDat.map((item, index) => {
                // Hide /creator if not admin
                if (item.link === "/creator" && !isAdmin) return null;

                return (
                  <li key={item.id} onClick={() => setIsOpen(false)}>
                    <Link href={item.link}>
                      <div className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-secondary hover:text-white rounded-lg transition-all duration-200 cursor-pointer group">
                        <div className="text-gray-400 group-hover:text-white transition-colors">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium bangla-font">
                          {item.title}
                        </span>
                      </div>
                      {/* Separator line except for last item */}
                      {index < TopbarActionDat.length - 1 && (
                        <div className="h-px bg-gray-700 mx-3 my-1" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Logout Section */}
          <div className="border-t border-gray-700 p-2">
            <LogOutButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* Modal Arrow */}
          <div className="absolute -top-2 right-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-700" />
        </div>
      </div>
    </div>
  );
}
