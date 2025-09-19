"use client";

import { Search } from "lucide-react";
import useDebounce from "@/app/src/hooks/useDebounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchCategories() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounced search function
  const doSearch = useDebounce((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  function handleSearch(term) {
    doSearch(term);
  }

  return (
    <div className="relative flex-1 max-w-md group">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-all duration-200 group-hover:scale-110 group-focus-within:text-white" />
      <input
        type="text"
        name="search"
        placeholder="Search categories..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        className="w-full pl-10 pr-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors placeholder:text-gray-400 text-white"
      />
    </div>
  );
}
