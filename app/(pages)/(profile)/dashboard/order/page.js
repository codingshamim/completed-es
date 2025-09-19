export default function OrderTable() {
  const orders = [
    {
      id: "ESV-2024-001",
      date: "Aug 15, 2024",
      time: "2:30 PM",
      items: "Wireless Headphones",
      additionalItems: "+ 2 more items",
      total: "$299.99",
      status: "Processing",
      statusColor: "yellow",
    },
    {
      id: "ESV-2024-002",
      date: "Aug 12, 2024",
      time: "11:45 AM",
      items: "Gaming Mouse",
      additionalItems: "1 item",
      total: "$89.99",
      status: "Shipped",
      statusColor: "blue",
    },
    {
      id: "ESV-2024-003",
      date: "Aug 08, 2024",
      time: "4:15 PM",
      items: "Smartphone Case",
      additionalItems: "+ 1 more item",
      total: "$45.50",
      status: "Delivered",
      statusColor: "green",
    },
  ];

  const getStatusStyle = (color) => {
    const styles = {
      yellow: "bg-yellow-900/30 text-yellow-400 border-yellow-800",
      blue: "bg-blue-900/30 text-blue-400 border-blue-800",
      green: "bg-green-900/30 text-green-400 border-green-800",
    };
    return styles[color] || styles.yellow;
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Your Orders
        </h1>
        <div className="flex items-center space-x-4">
          <select className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm w-48 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50 border-b border-gray-700">
              <tr>
                <th className="text-left p-4 font-medium text-gray-300">
                  Order ID
                </th>
                <th className="text-left p-4 font-medium text-gray-300">
                  Date
                </th>
                <th className="text-left p-4 font-medium text-gray-300">
                  Items
                </th>
                <th className="text-left p-4 font-medium text-gray-300">
                  Total
                </th>
                <th className="text-left p-4 font-medium text-gray-300">
                  Status
                </th>
                <th className="text-left p-4 font-medium text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-900/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="font-medium text-purple-400">
                      #{order.id}
                    </div>
                    <div className="text-xs text-gray-500">Order placed</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-white">{order.date}</div>
                    <div className="text-xs text-gray-500">{order.time}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-700 rounded"></div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {order.items}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.additionalItems}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white">{order.total}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                        order.statusColor
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                      Track Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">Showing 1 to 3 of 12 orders</div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-gray-700 rounded-lg text-sm hover:bg-gray-800 transition-colors text-white">
            Previous
          </button>
          <button className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm">
            1
          </button>
          <button className="px-3 py-2 border border-gray-700 rounded-lg text-sm hover:bg-gray-800 transition-colors text-white">
            2
          </button>
          <button className="px-3 py-2 border border-gray-700 rounded-lg text-sm hover:bg-gray-800 transition-colors text-white">
            3
          </button>
          <button className="px-3 py-2 border border-gray-700 rounded-lg text-sm hover:bg-gray-800 transition-colors text-white">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
