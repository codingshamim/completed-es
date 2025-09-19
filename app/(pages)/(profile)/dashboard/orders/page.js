import React from "react";
import {
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  Calendar,
  Eye,
} from "lucide-react";
import { getOrderByLoggedinUser } from "@/app/actions/order.action";
import Link from "next/link";
import mainPrice from "@/helpers/mainPrice";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-900/20 text-green-400 border-green-900/50";
    case "shipped":
      return "bg-blue-900/20 text-blue-400 border-blue-900/50";
    case "pending":
      return "bg-yellow-900/20 text-yellow-400 border-yellow-900/50";
    case "cancelled":
      return "bg-red-900/20 text-red-400 border-red-900/50";
    default:
      return "bg-gray-700 text-gray-300 border-gray-600";
  }
};

const getPaymentStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-green-900/20 text-green-400 border-green-900/50";
    case "pending":
      return "bg-yellow-900/20 text-yellow-400 border-yellow-900/50";
    case "failed":
      return "bg-red-900/20 text-red-400 border-red-900/50";
    default:
      return "bg-gray-700 text-gray-300 border-gray-600";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const calculateTotal = (order) => {
  const itemsTotal = order.orders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return itemsTotal + order.shippingOption.fee;
};

const OrderTable = async () => {
  // Sample data based on your order structure
  const { orders } = await getOrderByLoggedinUser();

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black rounded-lg shadow-xl border border-gray-800 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Order ID
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Delivered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-700">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-secondary transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-white">
                        {order.transactionId}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {order.orders.length} item(s)
                      </div>
                      <div className="text-sm text-gray-400">
                        Size: {order.orders[0]?.size || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {mainPrice(calculateTotal(order))}
                      </div>
                      <div className="text-sm text-gray-400">
                        + {mainPrice(order.shippingOption.fee)} shipping
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          order.delivered
                        )}`}
                      >
                        {order.delivered}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span
                          className={`inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusColor(
                            order.paymentStatus
                          )} mb-1`}
                        >
                          {order.paymentStatus}
                        </span>
                        <span className="text-xs  text-gray-400">
                          {order.paymentMethod}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/dashboard/order/${order?.transactionId}`}
                        className="flex items-center gap-1 text-white "
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4 p-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-black border border-gray-700 rounded-lg p-4 shadow-lg"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-gray-400" />
                    <span className="font-mono text-sm font-medium text-white">
                      {order.transactionId}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      order.delivered
                    )}`}
                  >
                    {order.delivered}
                  </span>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-300">
                      {order.address.address}
                    </p>
                    <p className="text-sm text-gray-400">
                      {order.address.city}, {order.address.district} -{" "}
                      {order.address.postalCode}
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Items
                    </p>
                    <p className="text-sm font-medium text-white">
                      {order.orders.length} item(s)
                    </p>
                    <p className="text-xs text-gray-400">
                      Size: {order.orders[0]?.size || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Total
                    </p>
                    <p className="text-sm font-medium text-white">
                      {mainPrice(calculateTotal(order))}
                    </p>
                    <p className="text-xs text-gray-400">
                      + {mainPrice(order.shippingOption.fee)} shipping
                    </p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                    <span className="text-sm text-gray-400">
                      via {order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {order.shippingOption.title}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {formatDate(order.createdAt)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-3 border-t border-gray-700">
                  <Link
                    href={`/dashboard/order/${order?.transactionId}`}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-lg border border-white"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State (if no orders) */}
          {orders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No orders found
              </h3>
              <p className="text-gray-400">
                When customers place orders, they will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderTable;
