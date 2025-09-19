"use client";

import { useState } from "react";
import { getDiscountAction } from "@/app/backend/actions/coupon.action";
import useCommonState from "@/app/src/hooks/useCommonState";
import mainPrice from "@/helpers/mainPrice";

export default function VoucherApply({ totalPrice }) {
  const [voucherCode, setVoucherCode] = useState("");
  const { common, setCommon } = useCommonState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleCoupon() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!voucherCode.trim()) {
      setError("Please enter a voucher code.");
      setLoading(false);
      return;
    }

    try {
      // get discount percentage from API
      const discount = await getDiscountAction(voucherCode);

      if (discount === 0) {
        throw new Error("Invalid or expired voucher code.");
      }

      // calculate discount amount
      const discountAmount = (totalPrice / 100) * discount;

      // save discount amount + voucher info in common
      setCommon({
        ...common,
        voucher: {
          code: voucherCode,
          percentage: discount,
          amount: discountAmount,
        },
      });

      setSuccess(`Discount applied: ${discount}% off`);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t border-gray-700 pt-4">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={voucherCode}
          onChange={(e) => {
            setVoucherCode(e.target.value);
            setError(null);
          }}
          placeholder="Enter your voucher code"
          className={`flex-1 bg-black border rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 ${
            error ? "border-red-500" : "border-gray-600"
          } ${loading ? "opacity-50" : ""}`}
          disabled={loading}
        />
        <button
          type="button"
          onClick={handleCoupon}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      {common?.voucher?.amount ? (
        <div className="flex justify-between text-green-400 mt-2">
          <span>Voucher Discount ({common.voucher.percentage}%)</span>
          <span>-{mainPrice(common.voucher.amount)}</span>
        </div>
      ) : null}
    </div>
  );
}
