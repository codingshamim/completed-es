export default function TableHeaderDesktop() {
  return (
    <thead className="bg-black border border-gray-700/50">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
          <div className="flex items-center space-x-2">
            <span>Product</span>
          </div>
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Category
        </th>
        <th className="px-6 flex items-center gap-2 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white">
          Price
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-down-up-icon lucide-arrow-down-up"
          >
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </svg>
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white">
          Stock
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Sizes
        </th>
        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
}
