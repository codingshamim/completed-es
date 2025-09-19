"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function CancelModal() {
  const { common, setCommon } = useCommonState();
  return (
    <button
      className="variable-btn bg-red-600"
      onClick={() =>
        setCommon({
          ...common,
          modal: false,
          modalContent: null,
        })
      }
    >
      Cancel
    </button>
  );
}
