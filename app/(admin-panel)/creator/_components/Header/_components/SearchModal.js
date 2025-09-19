import React, { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const sidebarList = [
  {
    title: "Dashboard",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-house-icon lucide-house"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    items: [],
    target: "/creator",
  },
  {
    title: "Products",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-box-icon lucide-box"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    items: [
      { title: "All Products", href: "/creator/products" },
      { title: "Create Product", href: "/creator/products/create" },
    ],
    target: "",
  },
  {
    title: "Orders",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-list-ordered-icon lucide-list-ordered"
      >
        <path d="M10 12h11" />
        <path d="M10 18h11" />
        <path d="M10 6h11" />
        <path d="M4 10h2" />
        <path d="M4 6h1v4" />
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
      </svg>
    ),
    items: [
      { title: "All Order", href: "/creator/orders" },
      { title: "Create Order", href: "/creator/orders/create" },
    ],
    target: "",
  },
  {
    title: "Inbox",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-square-more-icon lucide-message-square-more"
      >
        <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
        <path d="M12 11h.01" />
        <path d="M16 11h.01" />
        <path d="M8 11h.01" />
      </svg>
    ),
    items: [],
    target: "/creator/inbox",
  },
];

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Filter sidebar items based on search query
  const filteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) return sidebarList;

    return sidebarList.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.items.some((subItem) =>
          subItem.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery]);

  // Handle navigation
  const handleNavigation = (href) => {
    // In a real application, you would use Next.js router or your routing solution
    router.push(href);

    // Close the modal after navigation
    onClose();

    // Uncomment and use your actual routing solution:
    // import { useRouter } from 'next/navigation';
    // const router = useRouter();
    // router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-black border border-gray-700 rounded-lg shadow-2xl animate-in slide-in-from-top-4 duration-300 ease-out">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Menus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-white"
              autoFocus
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {/* Sidebar Navigation Section */}
          <div className="p-2">
            <div className="px-2 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Navigation
            </div>
            <div className="space-y-1">
              {filteredItems.map((item, index) => (
                <div key={index}>
                  {/* Main item */}
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary group transition-colors duration-150 ${
                      item.target ? "cursor-pointer" : "cursor-default"
                    }`}
                    onClick={() => item.target && handleNavigation(item.target)}
                  >
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                    <div className="w-4 h-4 text-gray-400 flex-shrink-0">
                      {item.svg}
                    </div>
                    <span className="text-gray-300 group-hover:text-white">
                      {item.title}
                    </span>
                  </div>

                  {/* Sub-items */}
                  {item.items && item.items.length > 0 && (
                    <div className="ml-6 space-y-1">
                      {item.items
                        .filter(
                          (subItem) =>
                            !searchQuery.trim() ||
                            subItem.title
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                        )
                        .map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer group transition-colors duration-150"
                            onClick={() => handleNavigation(subItem.href)}
                          >
                            <ArrowRight className="w-3 h-3 text-gray-500 group-hover:text-gray-300" />
                            <span className="text-sm text-gray-400 group-hover:text-white">
                              {subItem.title}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && searchQuery.trim() && (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">No results found</div>
              <div className="text-sm text-gray-500">
                Try searching for something else
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700 bg-black">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                Go to Page
              </span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs">
                ESC
              </kbd>
              <span>to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
