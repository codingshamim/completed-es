import { totalOrderByUser } from "@/app/actions/order.action";
import mainPrice from "@/helpers/mainPrice";

export default async function CustomerInformation({ user }) {
  const lifeTimeOrderByUser = await totalOrderByUser(user?._id);

  return (
    <div className=" rounded-lg border border-gray-800">
      <div className="p-6 border-b border-gray-800 ">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center mr-3">
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
              className="lucide lucide-user-icon lucide-user"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx={12} cy={7} r={4} />
            </svg>
          </div>
          Customer Info
        </h3>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              {user?.name || "Unknown User"}
            </h4>
            <p className="text-gray-400 text-sm">
              Customer since {user?.createdAt || "Unknown Date"}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg border border-gray-700">
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
              className="lucide lucide-mail-icon lucide-mail"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x={2} y={4} width={20} height={16} rx={2} />
            </svg>

            <span className="text-gray-300 text-sm">
              {user?.email || "We are working on email support"}
            </span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg border border-gray-700">
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
              className="lucide lucide-phone-icon lucide-phone"
            >
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
            </svg>

            <span className="text-gray-300 text-sm">
              {user?.phone || "Unknown Phone"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3  rounded-lg border border-gray-700 text-center">
              <div className="text-white font-semibold text-lg">
                {lifeTimeOrderByUser?.totalOrder}
              </div>
              <div className="text-gray-400 text-xs">Total Orders</div>
            </div>
            <div className="p-3  rounded-lg border border-gray-700 text-center">
              <div className="text-white font-semibold text-lg">
                {mainPrice(lifeTimeOrderByUser?.totalValue)}
              </div>
              <div className="text-gray-400 text-xs">Lifetime Value</div>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors">
            <i className="fas fa-user-edit mr-2" />
            View Customer Profile
          </button>
        </div>
      </div>
    </div>
  );
}
