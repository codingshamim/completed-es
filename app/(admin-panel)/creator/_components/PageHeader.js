import Link from "next/link";

export default function PageHeader({
  title = "Title",
  subTitle = "Sub title",
  actionButton,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          {title}
        </h1>
        <p className="text-gray-400">{subTitle}</p>
      </div>
    </div>
  );
}
