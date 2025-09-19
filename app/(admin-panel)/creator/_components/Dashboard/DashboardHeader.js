export default function DashboardHeader({ title, children }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-gray-400 mt-1">{children}</p>
      </div>
    </div>
  );
}
