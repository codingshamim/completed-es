"use client";
export default function TryAgainButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="border-2 flex items-center gap-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-white/20 transform hover:-translate-y-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
      Try Again
    </button>
  );
}
