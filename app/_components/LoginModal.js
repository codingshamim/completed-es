"use client";

import { useEffect, useState } from "react";
import useCommonState from "../src/hooks/useCommonState";

export default function LoginModal({ children }) {
  const { common, setCommon } = useCommonState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (common.loginModal) {
      // Trigger animation after mount
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [common.loginModal]);

  const closeModal = () => {
    setIsVisible(false);
    // Wait for animation to complete before closing
    setTimeout(() => {
      setCommon({ ...common, loginModal: false });
    }, 300);
  };

  return (
    <>
      {common.loginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with fade animation */}
          <div
            onClick={closeModal}
            className={`absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Modal Content with scale and fade animation */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 transition-all duration-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
