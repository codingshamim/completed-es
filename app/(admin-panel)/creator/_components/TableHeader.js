export default function TableHeader({ title = "", totalItems = "0 Found" }) {
  return (
    <div className="bg-black px-4 lg:px-6 py-4 border-b border-gray-700/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">{totalItems}</span>
        </div>
      </div>
    </div>
  );
}
