/* eslint-disable react/no-unescaped-entities */
//react / no - unescaped - entities;
import getOrders from "@/app/actions/order.action";
import FilterAndSearch from "../_components/FilterAndSearch";
import PageHeader from "../_components/PageHeader";
import Pagination from "../_components/Pagination";
import FilterInput from "../_components/FilterInput";
import StatsCard from "./_components/StatsCard";
import OrderItems from "./_components/OrderItems";

import { format } from "date-fns";
import { calculateItemTotal } from "@/helpers/calculateItemTotal";
import Link from "next/link";
import DeleteOrderButton from "./_components/DeleteOrderButton";
import Image from "next/image";

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;

  const orders = await getOrders(
    params?.query || "",
    params?.filter || "",
    parseInt(params?.limit) || 10,
    parseInt(params?.page) || 1
  );

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
      <StatsCard
        totalItems={orders?.totalItems || 0}
        completedOrder={orders?.completedOrder || 0}
        pendingOrder={orders?.pendingOrder || 0}
        totalRevenue={orders?.totalRevenue || 0}
      />

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
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
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

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold">
                              {order?.address?.name
                                ?.slice(0, 2)
                                .toUpperCase() || "NA"}
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

                        <OrderItems orders={order.orders} />

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

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {formattedDate}
                          </div>
                          <div className="text-xs text-gray-400">
                            {formattedTime}
                          </div>
                        </td>

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
                              >
                                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                <circle cx={12} cy={12} r={3} />
                              </svg>
                            </Link>

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

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 p-4">
              {orders.orders.map((order) => {
                const orderTotal =
                  calculateItemTotal(order.orders) +
                  (order.shippingOption?.fee || 0);
                const formattedDate = order.createdAt
                  ? format(new Date(order.createdAt), "MMM d, yyyy")
                  : "N/A";

                return (
                  <div
                    key={order._id}
                    className="bg-black border border-gray-800 rounded-lg p-4 space-y-4"
                  >
                    {/* Product Info with Image */}
                    <div className="flex gap-3">
                      {order.orders &&
                        order.orders[0]?.product?.images?.[0] && (
                          <Image
                            src={order.orders[0].product.images[0]}
                            alt={order.orders[0].product.name || "Product"}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm line-clamp-2">
                          {order.orders?.[0]?.product?.name || "Product"}
                        </h3>
                        {order.orders?.[0]?.size && (
                          <p className="text-gray-400 text-xs mt-1">
                            Size: {order.orders[0].size}
                          </p>
                        )}
                        {order.orders?.[0]?.quantity && (
                          <p className="text-gray-400 text-xs">
                            Qty: {order.orders[0].quantity}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price Info */}
                    <div className="flex justify-between items-center border-t border-gray-800 pt-3">
                      <p className="text-gray-400 text-xs">Total Price:</p>
                      <p className="text-white font-bold">
                        BDT {orderTotal.toFixed(2)}
                      </p>
                    </div>

                    {/* Customer & Status Info */}
                    <div className="border-t border-gray-800 pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Customer:</span>
                        <span className="text-white">
                          {order?.address?.name || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Order ID:</span>
                        <span className="text-white text-xs">
                          {order.transactionId || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white">{formattedDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Status:</span>
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
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 border-t border-gray-800 pt-3">
                      <Link
                        href={`/creator/order/${order.transactionId}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg text-center transition-colors"
                      >
                        Edit
                      </Link>
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-center">
            <div className="text-center p-8 shadow-xl rounded-2xl max-w-sm w-full">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full mb-4">
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
                    d="M9 13h6m-6 4h6M5 7h14M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                No Orders Found
              </h2>
              <p className="text-gray-500 mt-2">
                Looks like your search didn't return any results.
              </p>
            </div>
          </div>
        )}

        <Pagination
          totalPages={orders?.totalPages}
          totalProducts={orders.totalItems}
          currentPage={orders?.currentPage}
        />
      </div>
    </div>
  );
}
