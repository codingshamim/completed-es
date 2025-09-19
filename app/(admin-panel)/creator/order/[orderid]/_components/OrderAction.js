import StatusUpdateButton from "./StatusUpdateButton";

export default function OrderAction({ orderId, currentStatus }) {
  // Define all possible status buttons
  const statusButtons = [
    {
      status: "Pending",
      title: "Mark as Pending",
      customClass: "bg-blue-600 hover:bg-blue-700",
    },
    {
      status: "Processing",
      title: "Mark as Processing",
      customClass: "bg-yellow-600 hover:bg-yellow-700",
    },
    {
      status: "Shipped",
      title: "Mark as Shipped",
      customClass: "bg-green-600 hover:bg-green-700",
    },
    {
      status: "Delivered",
      title: "Mark as Delivered",
      customClass: "bg-orange-600 hover:bg-orange-700",
    },
  ];

  // Filter out the current status button
  const filteredButtons = statusButtons.filter(
    (button) => button.status !== currentStatus
  );

  // Only show cancel button if order is not already cancelled
  const showCancelButton = currentStatus !== "Cancelled";

  return (
    <div className="rounded-lg border border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
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
              className="lucide lucide-cog-icon lucide-cog"
            >
              <path d="M11 10.27 7 3.34" />
              <path d="m11 13.73-4 6.93" />
              <path d="M12 22v-2" />
              <path d="M12 2v2" />
              <path d="M14 12h8" />
              <path d="m17 20.66-1-1.73" />
              <path d="m17 3.34-1 1.73" />
              <path d="M2 12h2" />
              <path d="m20.66 17-1.73-1" />
              <path d="m20.66 7-1.73 1" />
              <path d="m3.34 17 1.73-1" />
              <path d="m3.34 7 1.73 1" />
              <circle cx={12} cy={12} r={2} />
              <circle cx={12} cy={12} r={8} />
            </svg>
          </div>
          Quick Actions
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {/* Render filtered status buttons */}
          {filteredButtons.map((button) => (
            <StatusUpdateButton
              key={button.status}
              orderId={orderId}
              title={button.title}
              customClass={button.customClass}
              status={button.status}
            />
          ))}

          {/* Cancel button - only show if not already cancelled */}
          {showCancelButton && (
            <div className="border-t border-gray-700 pt-3 mt-4">
              <StatusUpdateButton
                orderId={orderId}
                title="Cancel Order"
                customClass="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                status="Cancelled"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
