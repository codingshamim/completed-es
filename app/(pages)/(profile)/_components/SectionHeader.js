export default function SectionHeader({ children, title }) {
  return (
    <div className="flex justify-center items-center mb-6 flex-col">
      <span className="border new-variable-btn bangla-font">
        {title || "Section Title"}
      </span>
      <p className="text-sm text-center mt-2 text-gray-300 bangla-font">
        {children || ""}
      </p>
    </div>
  );
}
