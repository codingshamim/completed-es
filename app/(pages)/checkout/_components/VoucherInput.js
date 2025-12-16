"use client";

import { getDiscountAction } from "@/app/backend/actions/coupon.action";
import useCommonState from "@/app/src/hooks/useCommonState";
import mainPrice from "@/helpers/mainPrice";
import { useState } from "react";
import ShippingFee from "./ShippingFee";

export default function VoucherInput({ totalPrice }) {
  const [voucherCode, setVoucherCode] = useState("");
  const { discountPercentage, setDiscountPercentage, common, setCommon } =
    useCommonState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const minusDiscount = (totalPrice / 100) * discountPercentage;
  async function handleCoupon() {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setDiscountPercentage(null);

    if (!voucherCode.trim()) {
      setError("Please enter a voucher code.");
      setLoading(false);
      return;
    }

    try {
      const discount = await getDiscountAction(voucherCode);

      if (discount === 0) {
        throw new Error("Invalid or expired voucher code.");
      }

      setDiscountPercentage(discount);
      setCommon({
        ...common,
        discountApplied: discount,
      });
      setSuccess(`Discount applied: ${discount}% off`);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {discountPercentage && (
        <div className="flex justify-between">
          <span>Discount </span>
          <span>
            {discountPercentage
              ? `-${mainPrice(minusDiscount)}`
              : "No discount applied"}
          </span>
        </div>
      )}
      <ShippingFee />
      <div className="flex  flex-col mt-4 space-y-2">
        <div className="flex">
          <input
            onChange={(e) => {
              setVoucherCode(e.target.value);
              setError(null);
            }}
            type="text"
            value={voucherCode}
            placeholder="Enter your voucher code"
            className={`flex-1 bg-black border border-gray-600 px-3 py-2 text-white placeholder-gray-400 ${
              loading && "opacity-50"
            } ${error ? "border-red-500" : ""}`}
            disabled={loading}
          />
          <button
            onClick={handleCoupon}
            type="button"
            className="ml-2 bangla-font px-2 md:px-4 py-2 bg-white text-black font-medium disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Applying..." : "এপ্লাই করুন"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
      </div>
    </>
  );
}
