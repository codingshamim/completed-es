import { format } from "date-fns";

export default function OrderTimeline({ status = "Pending", createdAt }) {
  const formattedDate = createdAt
    ? format(new Date(createdAt), "MMM d, yyyy")
    : "N/A";

  // If order is cancelled, show different UI
  if (status === "Cancelled") {
    return (
      <div className="mb-8">
        <div className="bg-black rounded-lg p-8 border border-red-800">
          <h3 className="text-xl font-semibold text-white mb-8 flex items-center">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-circle"
              >
                <circle cx={12} cy={12} r={10} />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </div>
            Order Status
          </h3>

          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x text-white"
              >
                <path d="m18 6-12 12" />
                <path d="m6 6 12 12" />
              </svg>
            </div>

            <h4 className="text-2xl font-bold text-red-400 mb-2">
              Order Cancelled
            </h4>
            <p className="text-gray-400 mb-6">
              Your order has been cancelled and will not be processed.
            </p>

            <div className="bg-red-900/30 border border-white rounded-lg p-4 text-left">
              <div className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-info text-red-400 mt-0.5 flex-shrink-0"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="m9 9 3 3 3-3" />
                </svg>
                <div>
                  <p className="text-red-300 font-medium mb-1">
                    Cancellation Details:
                  </p>
                  <p className="text-gray-300 text-sm">
                    Order placed on {formattedDate}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    If you were charged for this order, the refund will be
                    processed within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal timeline for other statuses
  const steps = [
    { key: "Pending", label: "Order Placed", icon: "check" },
    { key: "Processing", label: "Processing", icon: "cog" },
    { key: "Shipped", label: "Shipped", icon: "truck" },
    { key: "Delivered", label: "Delivered", icon: "house" },
  ];

  // Find current step index
  const currentStepIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="mb-8">
      <div className="bg-black rounded-lg p-8 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-8 flex items-center">
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
              className="lucide lucide-clock"
            >
              <path d="M12 6v6l4 2" />
              <circle cx={12} cy={12} r={10} />
            </svg>
          </div>
          Order Timeline
        </h3>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-8 left-12 right-12 h-1 bg-gray-700" />
          <div
            className="absolute top-8 left-12 h-1 bg-green-600 transition-all duration-500"
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 94}%`,
            }}
          />

          {/* Steps */}
          <div className="flex items-center justify-between relative z-10">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isActive = index === currentStepIndex;

              let bgColor = "bg-gray-700";
              let textColor = "text-gray-400";
              let subText = "Pending";

              if (isCompleted) {
                bgColor = "bg-green-600";
                textColor = "text-white";
                subText = "Completed";
              } else if (isActive) {
                bgColor = "bg-green-600";
                textColor = "text-white";
                subText = "In Progress";
              }

              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 ${bgColor}`}
                  >
                    {step.icon === "check" && (
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
                        className="lucide lucide-check"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                    {step.icon === "cog" && (
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
                        className="lucide lucide-cog"
                      >
                        <circle cx={12} cy={12} r={3} />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06c.46-.46.59-1.14.33-1.82a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09c.7 0 1.3-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06c.46.46 1.14.59 1.82.33h.06c.6-.2 1-.8 1-1.51V3a2 2 0 1 1 4 0v.09c0 .7.4 1.3 1 1.51.68.26 1.36.13 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06c-.46.46-.59 1.14-.33 1.82.21.6.81 1 1.51 1H21a2 2 0 0 1 0 4h-.09c-.7 0-1.3.4-1.51 1z" />
                      </svg>
                    )}
                    {step.icon === "truck" && (
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
                        className="lucide lucide-truck"
                      >
                        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                        <path d="M15 18H9" />
                        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                        <circle cx={17} cy={18} r={2} />
                        <circle cx={7} cy={18} r={2} />
                      </svg>
                    )}
                    {step.icon === "house" && (
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
                        className="lucide lucide-house"
                      >
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      </svg>
                    )}
                  </div>
                  <span className={`${textColor} font-semibold mb-1`}>
                    {step.label}
                  </span>
                  {index === 0 ? (
                    <span className="text-sm text-gray-400">
                      {formattedDate}
                    </span>
                  ) : (
                    <span
                      className={`text-sm ${
                        isActive ? "text-green-400" : "text-gray-500"
                      }`}
                    >
                      {subText}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
