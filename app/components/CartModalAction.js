"use client";

import useCommonState from "../src/hooks/useCommonState";

export default function CartModalAction({ id, stock }) {
  const { common, setCommon } = useCommonState();
  const handleAdd = () => {
    setCommon({
      ...common,
      buyModal: true,
      productId: id,
      quantity: 1,
      stock: stock,
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full group relative overflow-hidden  hover:bg-secondary border border-gray-600 hover:border-gray-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
    >
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-cart group-hover:animate-bounce transition-transform duration-200"
          >
            <circle cx={8} cy={21} r={1} />
            <circle cx={19} cy={21} r={1} />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>

          {/* Plus icon overlay for add action */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </div>

        <span className="font-semibold tracking-wide bangla-font">
          কার্টে যোগ করুন
        </span>
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
    </button>
  );
}
