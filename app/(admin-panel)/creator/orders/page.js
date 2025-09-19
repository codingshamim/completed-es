import getOrders from "@/app/actions/order.action";
import FilterAndSearch from "../_components/FilterAndSearch";
import PageHeader from "../_components/PageHeader";
import Pagination from "../_components/Pagination";
import FilterInput from "../_components/FilterInput";
import StatsCard from "./_components/StatsCard";
import OrderItems from "./_components/OrderItems";

import { format } from "date-fns"; // for clean date formatting

import { calculateItemTotal } from "@/helpers/calculateItemTotal";
import Link from "next/link";
import DeleteOrderButton from "./_components/DeleteOrderButton";

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;

  // Fetch orders with query + filter + pagination
  const orders = await getOrders(
    params?.query || "",
    params?.filter || "",
    parseInt(params?.limit) || 10,
    parseInt(params?.page) || 1
  );

  // Handle error
  if (orders?.error) {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-center">
        <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">
          Error loading orders
        </h2>
        <p className="text-gray-400">
          {orders.message || "Please try again later."}
        </p>
      </div>
    );
  }

  return (
    <div id="orders-page" className="page-content p-6">
      {/* Header */}

      {/* Stats */}
      <StatsCard
        totalItems={orders?.totalItems || 0}
        completedOrder={orders?.completedOrder || 0}
        pendingOrder={orders?.pendingOrder || 0}
        totalRevenue={orders?.totalRevenue || 0}
      />

      {/* Table */}
      <div className="overflow-hidden shadow-2xl">
        <PageHeader
          title="Orders"
          subTitle="Manage your order inventory and listings"
        />

        <FilterAndSearch
          filterInput={
            <FilterInput
              inputTitle="Order Status"
              filterItems={["Delivered", "Pending", "Cancelled"]}
            />
          }
        />

        {orders.orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {[
                    "Order ID",
                    "Customer",
                    "Products",
                    "Amount",
                    "Payment",
                    "Status",
                    "Date",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                className="divide-y divide-gray-700"
                id="orders-table-body"
              >
                {orders.orders.map((order) => {
                  const orderTotal =
                    calculateItemTotal(order.orders) +
                    (order.shippingOption?.fee || 0);
                  const formattedDate = order.createdAt
                    ? format(new Date(order.createdAt), "MMM d, yyyy")
                    : "N/A";
                  const formattedTime = order.createdAt
                    ? format(new Date(order.createdAt), "h:mm a")
                    : "";

                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-750 transition-colors"
                    >
                      {/* Order ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-white">
                            {order.transactionId || "N/A"}
                          </div>
                          <div className="text-xs text-gray-400">
                            Transaction ID
                          </div>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold">
                            {order?.address?.name?.slice(0, 2).toUpperCase() ||
                              "NA"}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-white">
                              {order?.address?.name || "N/A"}
                            </div>
                            <div className="text-sm text-gray-400">
                              {order?.address?.phone || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Products */}
                      <OrderItems orders={order.orders} />

                      {/* Amount */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-white">
                          ৳{orderTotal.toFixed(2)}
                        </div>
                        {order?.shippingOption?.fee ? (
                          <div className="text-xs text-gray-400">
                            +৳{order.shippingOption.fee} shipping
                          </div>
                        ) : null}
                      </td>

                      {/* Payment */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full w-fit ${
                              order.paymentStatus === "paid"
                                ? "bg-green-600 text-white"
                                : "bg-yellow-600 text-white"
                            }`}
                          >
                            {order.paymentStatus || "N/A"}
                          </span>
                          <span className="text-xs text-gray-400">
                            {order.paymentMethod || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            order.delivered === "Delivered"
                              ? "bg-green-600"
                              : order.delivered === "Cancelled"
                              ? "bg-red-600"
                              : "bg-orange-600"
                          } text-white`}
                        >
                          {order.delivered || "N/A"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          {formattedDate}
                        </div>
                        <div className="text-xs text-gray-400">
                          {formattedTime}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/creator/order/${order.transactionId}`}
                            className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-400/10 rounded-lg transition-all"
                            title="View Order"
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
                              className="lucide lucide-eye-icon lucide-eye"
                            >
                              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                              <circle cx={12} cy={12} r={3} />
                            </svg>
                          </Link>

                          <button
                            className="text-purple-400 hover:text-purple-300 p-2 hover:bg-purple-400/10 rounded-lg transition-all"
                            title="Print Invoice"
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
                              className="lucide lucide-printer-icon lucide-printer"
                            >
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                              <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
                              <rect x={6} y={14} width={12} height={8} rx={1} />
                            </svg>
                          </button>
                          <DeleteOrderButton
                            orderId={order?._id}
                            transactionId={order?.transactionId}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex  w-full items-center justify-center ">
            <div className="text-center p-8  shadow-xl rounded-2xl max-w-sm w-full">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full  mb-4">
                <svg
                  className="w-8 h-8 bg-transparent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 13h6m-6 4h6M5 7h14M5 21h14a2 2 0 002-2V7a2 
                 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                No Orders Found
              </h2>
              <p className="text-gray-500 mt-2">
                Looks like your search didn’t return any results.
              </p>
            </div>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          totalPages={orders?.totalPages}
          totalProducts={orders.totalItems}
          currentPage={orders?.currentPage}
        />
      </div>
    </div>
  );
}
