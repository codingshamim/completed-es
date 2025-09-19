"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function DeleteOrderButton({ orderId, transactionId }) {
  const { common, setCommon } = useCommonState();
  return (
    <button
      onClick={() =>
        setCommon({
          ...common,
          modalMode: "delete-order",
          isOpenModal: true,
          deleteOrder: {
            orderId: orderId,
            transactionId: transactionId,
          },

          modalTitle: "Delete Order?",
        })
      }
      className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-all"
      title="Delete Order"
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
        className="lucide lucide-trash2-icon lucide-trash-2"
      >
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    </button>
  );
}
