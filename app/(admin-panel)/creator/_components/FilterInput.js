"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterInput({ inputTitle, filterItems }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get("filter") || "All Categories";
  const [selectedFilter, setSelectedFilter] = useState(currentFilter);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedFilter === "All Categories") {
      params.delete("filter");
    } else {
      params.set("filter", selectedFilter);
    }

    router.push(`?${params.toString()}`);
  }, [selectedFilter, router, searchParams]);

  return (
    <select
      value={selectedFilter}
      onChange={(e) => setSelectedFilter(e.target.value)}
      className="bg-dark-800/80 border border-gray-600/50 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
    >
      <option value="All Categories">{inputTitle}</option>
      {filterItems.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
