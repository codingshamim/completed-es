"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

import mainPrice from "@/helpers/mainPrice";

export default function ShippingFee() {
  const { common } = useCommonState();
  return (
    <div className="flex justify-between">
      <span className="bangla-font">ডেলিভারি চার্জ</span>
      <span>{mainPrice(common?.shippingOption?.fee)}</span>
    </div>
  );
}
