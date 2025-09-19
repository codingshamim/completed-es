export function PaymentMethod({ paymentMethod, paymentStatus, transactionId }) {
  const getPaymentIcon = (method) => {
    const methodLower = (method || "").toLowerCase();
    if (methodLower.includes("visa"))
      return { color: "bg-blue-600", text: "VISA" };
    if (methodLower.includes("mastercard"))
      return { color: "bg-red-600", text: "MC" };
    if (methodLower.includes("nagad"))
      return { color: "bg-orange-600", text: "NGD" };
    if (methodLower.includes("bkash"))
      return { color: "bg-pink-600", text: "BKS" };
    if (methodLower.includes("rocket"))
      return { color: "bg-purple-600", text: "RKT" };
    return { color: "bg-gray-600", text: "PAY" };
  };

  const getPaymentStatusDisplay = (status) => {
    const statusLower = (status || "").toLowerCase();
    if (statusLower === "submitted" || statusLower === "paid") {
      return { text: "✓ Payment Confirmed", color: "text-green-400" };
    } else if (statusLower === "pending") {
      return { text: "⏳ Payment Pending", color: "text-yellow-400" };
    } else if (statusLower === "failed") {
      return { text: "✗ Payment Failed", color: "text-red-400" };
    } else {
      return { text: "Payment Pending", color: "text-yellow-400" };
    }
  };

  const paymentIcon = getPaymentIcon(paymentMethod);
  const paymentStatusDisplay = getPaymentStatusDisplay(paymentStatus);

  return (
    <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg  transition-all duration-300">
      <h3 className="text-xl font-bold mb-4 text-white">Payment Method</h3>
      <div className="text-gray-300">
        <div className="flex items-center space-x-2 mb-2">
          <div
            className={`w-8 h-6 ${paymentIcon.color} rounded flex items-center justify-center text-white text-xs font-bold`}
          >
            {paymentIcon.text}
          </div>

          <span>{paymentMethod || "Payment method not specified"}</span>
        </div>

        <div className={`text-sm ${paymentStatusDisplay.color} mt-2`}>
          {paymentStatusDisplay.text}
        </div>
        <p className="text-sm mt-2 text-gray-400">
          {paymentStatus !== "submitted" &&
            paymentStatus !== "verified" &&
            "Your order is placed but not yet completed."}
        </p>
      </div>
    </div>
  );
}
