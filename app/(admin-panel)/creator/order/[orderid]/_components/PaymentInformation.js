import { format } from "date-fns";
import VerifiedButton from "./VerifiedButton";
import Link from "next/link";

export default function PaymentInformation({
  paymentMethod,
  paymentStatus,
  transactionId,
  tranId,
  createdAt,
  paymentNumber,
}) {
  const formattedDate = createdAt
    ? format(new Date(createdAt), "MMM d, yyyy")
    : "N/A";
  const formattedTime = createdAt ? format(new Date(createdAt), "h:mm a") : "";

  return (
    <div className=" rounded-lg border border-gray-800">
      <div className="p-6 border-b border-gray-800 ">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center mr-3">
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
              className="lucide lucide-credit-card-icon lucide-credit-card"
            >
              <rect width={20} height={14} x={2} y={5} rx={2} />
              <line x1={2} x2={22} y1={10} y2={10} />
            </svg>
          </div>
          Payment Info
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Method:</span>
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium capitalize">
                {paymentMethod == "cod" ? "Cash on Delivery" : paymentMethod}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Number:</span>
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium capitalize">
                {paymentNumber}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Status:</span>
            <span
              className={`${
                paymentStatus === "pending" ? "bg-yellow-600" : "bg-green-600"
              } px-3 capitalize py-1 text-xs font-semibold  text-white rounded-full`}
            >
              {paymentStatus}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Transaction ID:</span>
            <span className="text-white font-mono text-sm bg-secondary px-2 py-1 rounded border-none ">
              {transactionId}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Date:</span>
            <span className="text-white">
              {formattedDate} - {formattedTime}
            </span>
          </div>
          {transactionId === "N/A" && (
            <Link
              href={`/validate-payment?transaction=${tranId}&method=cod`}
              className="new-variable-btn bg-secondary flex justify-center items-center !py-3 px-4"
            >
              Verify Payment
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
