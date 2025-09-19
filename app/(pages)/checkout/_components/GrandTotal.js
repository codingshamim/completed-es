"use client";

import useCommonState from "@/app/src/hooks/useCommonState";
import mainPrice from "@/helpers/mainPrice";

export default function GrandTotal({ totalPrice }) {
  const { common } = useCommonState();
  const discountPrice = (totalPrice / 100) * common?.discountApplied;
  return (
    <div className="flex justify-between text-lg font-semibold">
      <span>Total</span>
      <span>{mainPrice(common?.shippingOption?.fee + totalPrice - discountPrice)}</span>
    </div>
  );
}
