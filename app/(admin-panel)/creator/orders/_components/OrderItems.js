import OrderItem from "./OrderItem";

export default async function OrderItems({ orders }) {


  // Extract all unique sizes from the orders array
  const sizes = [...new Set(orders.map((item) => item.size))];
  const sizeLabel = sizes.join(", "); // e.g. "XL, L" if mixed

  return (
    <td className="px-6 py-4">
      <div className="flex items-center space-x-2">
        {orders.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
        <div>
          <div className="text-sm text-white">
            {orders.length} Item{orders.length > 1 ? "s" : ""}
          </div>
          <div className="text-xs text-gray-400">Size: {sizeLabel}</div>
        </div>
      </div>
    </td>
  );
}
