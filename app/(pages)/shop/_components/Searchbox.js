"use client";
import useDebounce from "@/app/src/hooks/useDebounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Searchbox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
    <div className="relative col-span-3 md:col-span-3 ">
      <input
        className="outline-none bangla-font focus:border-white py-3 px-12 pr-16 rounded-lg w-full bg-transparent nav-border transition-all duration-300 ease-in-out focus:shadow-lg hover:shadow-md placeholder:text-opacity-70 text-sm font-medium"
        type="text"
        name="search"
        placeholder="আপনার পছন্দের টি-শার্টটি খুঁজে নিন..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-1/2 left-4 -translate-y-1/2 svg lucide lucide-search transition-all duration-200 group-hover:scale-110 opacity-70 group-focus-within:opacity-100"
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <button
        type="button"
        onClick={() =>
          handleSearch(document.querySelector('input[name="search"]').value)
        }
        className="absolute top-1/2 right-3 -translate-y-1/2 px-3 py-1.5 rounded-md bg-transparent nav-border hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:border-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
