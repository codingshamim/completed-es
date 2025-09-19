import { recentOrder } from "@/app/actions/dashboard.action";
import mainPrice from "@/helpers/mainPrice";

import Link from "next/link";

export default async function RecentOrders() {
  const orders = await recentOrder();

  // Helper function to calculate time ago
  const timeAgo = (date) => {
    const now = new Date();
    const orderDate = new Date(date);
    const diffInMs = now - orderDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInDays > 0)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    if (diffInHours > 0)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInMinutes > 0)
      return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  // Helper function to calculate total price
  const calculateTotalPrice = (order) => {
    const itemsTotal =
      order?.orders?.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0) || 0;

    const shippingFee = order?.shippingOption?.fee || 0;
    return itemsTotal + shippingFee;
  };

  return (
    <div className="bg-black rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Recent Orders</h3>
        <Link
          href={`/creator/orders`}
          className="text-white hover:text-blue-300 text-sm"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {orders && orders?.orders?.length > 0 ? (
          orders?.orders?.map((order) => (
            <div
              key={order?._id}
              className="flex items-center justify-between p-4 bg-black rounded-lg hover:bg-secondary border border-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="font-medium text-white">
                    {order?.transactionId}
                  </p>
                  <p className="text-sm text-gray-400">
                    {order?.orders?.map((item, index) => (
                      <span key={index}>
                        {index > 0 && ", "}
                        Size: {item.size}, Quantity : ({item.quantity}x)
                      </span>
                    ))}
                  </p>
                  <p className="text-xs text-gray-500">
                    Status: {order?.delivered} • {order?.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-green-400">
                  {mainPrice(calculateTotalPrice(order).toFixed(2))}
                </p>
                <p className="text-xs text-gray-400">
                  {timeAgo(order?.createdAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No recent orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
