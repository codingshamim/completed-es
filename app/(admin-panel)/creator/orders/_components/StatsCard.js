import mainPrice from "@/helpers/mainPrice";

export default function StatsCard({
  totalItems,
  completedOrder,
  pendingOrder,
  totalRevenue
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Orders</p>
            <p className="text-3xl font-bold text-white">{totalItems}</p>
          </div>
          <div className="bg-blue-500/30 p-3 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
            >
              <circle cx={8} cy={21} r={1} />
              <circle cx={19} cy={21} r={1} />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold text-white">{completedOrder}</p>
          </div>
          <div className="bg-green-500/30 p-3 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-badge-check-icon lucide-badge-check"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-100 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-white">{pendingOrder}</p>
          </div>
          <div className="bg-yellow-500/30 p-3 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock-icon lucide-clock"
            >
              <path d="M12 6v6l4 2" />
              <circle cx={12} cy={12} r={10} />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Revenue</p>
            <p className="text-3xl font-bold text-white">{mainPrice(totalRevenue)}</p>
          </div>
          <div className="bg-purple-500/30 p-3 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-badge-cent-icon lucide-badge-cent"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="M12 7v10" />
              <path d="M15.4 10a4 4 0 1 0 0 4" />
            </svg>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}
