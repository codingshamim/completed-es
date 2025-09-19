"use client";
import { useState } from "react";
import SearchModal from "./_components/SearchModal";

// Updated MainSearchbar component
export default function MainSearchbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative flex-1 min-w-[180px] max-w-md w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-white cursor-pointer"
          onClick={handleInputClick}
          readOnly
        />
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
          className="lucide lucide-search absolute left-3 top-2.5 text-gray-400"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx={11} cy={11} r={8} />
        </svg>
      </div>

      <SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
