import { dashboardStats } from "@/app/actions/dashboard.action";
import formatNumber from "@/helpers/formatNumber";
import mainPrice from "@/helpers/mainPrice";

export default async function StatsCards() {
  const stats = await dashboardStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-black rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-white mt-2">
              {formatNumber(stats?.totalOrders?.currentMonth || 0)}
            </p>
            <p className="text-green-400 text-sm mt-1">
              {stats?.totalOrders?.percentage || 0} from last month
            </p>
          </div>
          <div className="p-3 bg-blue-600 rounded-lg">
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
              className="lucide lucide-list-ordered-icon lucide-list-ordered"
            >
              <path d="M10 12h11" />
              <path d="M10 18h11" />
              <path d="M10 6h11" />
              <path d="M4 10h2" />
              <path d="M4 6h1v4" />
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-black rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Revenue</p>
            <p className="text-3xl font-bold text-white mt-2">
              {mainPrice(stats?.totalRevenue?.currentMonth || 0)}
            </p>
            <p className="text-green-400 text-sm mt-1">
              {stats?.totalRevenue?.percentage || 0} from last month
            </p>
          </div>
          <div className="p-3 bg-green-600 rounded-lg">
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
              className="lucide lucide-hand-coins-icon lucide-hand-coins"
            >
              <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
              <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
              <path d="m2 16 6 6" />
              <circle cx={16} cy={9} r="2.9" />
              <circle cx={6} cy={5} r={3} />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-black rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Item Sold</p>
            <p className="text-3xl font-bold text-white mt-2">
              {formatNumber(stats?.totalItemsSold?.currentMonth || 0)}
            </p>
            <p className="text-green-400 text-sm mt-1">
              {stats?.totalItemsSold?.percentage} from last month
            </p>
          </div>
          <div className="p-3 bg-purple-600 rounded-lg">
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
              className="lucide lucide-shopping-basket-icon lucide-shopping-basket"
            >
              <path d="m15 11-1 9" />
              <path d="m19 11-4-7" />
              <path d="M2 11h20" />
              <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
              <path d="M4.5 15.5h15" />
              <path d="m5 11 4-7" />
              <path d="m9 11 1 9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
