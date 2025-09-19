"use client";

import useCommonState from "../src/hooks/useCommonState";

export default function BuyNowButton({ stock, id }) {
  const { common, setCommon } = useCommonState();
  const handleBuyNow = () => {
    setCommon({
      ...common,
      buyModal: true,
      productId: id,
      quantity: 1,
      stock: stock,
      buyModalMode: "buy-now",
    });
  };
  return (
    <button
      onClick={handleBuyNow}
      className="btn flex justify-between items-center gap-3 border"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shopping-bag"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <span>Buy now</span>
    </button>
  );
}
