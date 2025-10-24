import mainPrice from "@/helpers/mainPrice";

import ProccedCheckout from "./ProccedCheckout";

export default function OrderSummary({ total, items, carts }) {
  const totalPrice = mainPrice(total);

  return (
    <div className="w-full border border-secondary p-4 mt-6">
      <h1 className="text-2xl font-bold">অর্ডার সম্পর্কিত তথ্য</h1>
      <div className="flex justify-between items-center mt-2 text-gray-200">
        <p className="bangla-font">সর্বমোট ({items} আইটেম)</p>
        <p> {totalPrice}</p>
      </div>

      <div className="mt-4">
        <ProccedCheckout items={items} carts={carts} />
      </div>
    </div>
  );
}
