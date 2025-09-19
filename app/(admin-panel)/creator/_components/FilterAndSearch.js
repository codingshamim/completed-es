import Link from "next/link";
import SearchInput from "./SearchInput";

export default function FilterAndSearch({ filterInput, actionButton }) {
  return (
    <div className="rounded-sm border-gray-700/50 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center  gap-4">
        {/* Search + Filters + Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Search should take most space */}
          <div className="flex-1 px-2 min-w-[200px]">
            <SearchInput actionObj={actionButton} />
          </div>

          {/* Filters */}
          <div className="px-2">{filterInput}</div>

          {/* Action Button */}
          {actionButton?.yes && (
            <div className="flex-shrink-0">
              {actionButton?.target?.length > 0 ? (
                <Link
                  href={actionButton?.target}
                  className="new-btn flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  {actionButton?.title}
                </Link>
              ) : (
                <button className="btn flex items-center gap-2 w-full sm:w-auto justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  {actionButton?.title}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
