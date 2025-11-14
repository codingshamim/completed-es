import OrderItem from "./OrderItem";

export default function OrderItems({ orders }) {
  return (
    <div className=" rounded-lg border border-gray-800">
      <div className="p-2 border-b border-gray-800 ">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <div className="w-8 h-8 rounded-lg bg-secondary text-white flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-bag-icon lucide-shopping-bag"
            >
              <path d="M16 10a4 4 0 0 1-8 0" />
              <path d="M3.103 6.034h17.794" />
              <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
            </svg>
          </div>
          Order Items
        </h3>
      </div>
      <div>
        <div className=" rounded-sm  md:p-4 ">
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
