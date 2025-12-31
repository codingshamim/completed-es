import { Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function NoCartItem() {
  return (
    <div className="flex justify-center items-center flex-col gap-6 min-h-[50vh] px-4">
      {/* Icon Container with Animation */}
      <div className="relative">
        {/* Pulsing background circle */}

        {/* Main icon with subtle animation */}
        <div className="relative transform transition-transform hover:scale-110 duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={80}
            height={80}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-frown opacity-90"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1={9} x2="9.01" y1={9} y2={9} />
            <line x1={15} x2="15.01" y1={9} y2={9} />
          </svg>
        </div>
      </div>

      {/* Text Content with Better Typography */}
      <div className="text-center space-y-2 max-w-md">
        <h2 className="text-2xl font-semibold tracking-tight">
          Your Cart is Empty
        </h2>
        <p className="text-base opacity-70 leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet. Start
          shopping to fill it up!
        </p>
      </div>

      {/* Action Buttons with Enhanced Spacing */}
      <div className="flex flex-col sm:flex-row gap-3 items-center mt-4">
        <Link
          href="/"
          className="new-btn min-w-[160px] text-center transition-all duration-300 hover:scale-105 "
        >
          <Home size={18} strokeWidth={1.5} />
          Go To Home
        </Link>
        <Link
          href="/shop"
          className="new-variable-btn nav-border min-w-[160px] text-center transition-all duration-300 hover:scale-105 "
        >
          <ShoppingBag size={18} strokeWidth={1.5} />
          Go To Shop
        </Link>
      </div>
    </div>
  );
}
