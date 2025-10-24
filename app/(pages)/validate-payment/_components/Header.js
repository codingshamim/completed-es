export default function Header({ orderTransactionId }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-white mb-2 bangla-font">
        পেমেন্ট যাচাইকরণ
      </h1>
      <p className="text-gray-400">
        Order ID:{" "}
        <span className="text-white font-mono">{orderTransactionId}</span>
      </p>
    </div>
  );
}
