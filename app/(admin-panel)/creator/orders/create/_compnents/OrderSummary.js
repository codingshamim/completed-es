"use client";

import useCommonState from "@/app/src/hooks/useCommonState";
import { calculateItemTotal } from "@/helpers/calculateItemTotal";
import mainPrice from "@/helpers/mainPrice";
import VoucherApply from "./VoucherApply";
import CreateOrderButton from "./CreateOrderButton";

export default function OrderSummary() {
  const { common, setCommon } = useCommonState();

  const total = calculateItemTotal(common?.selectedProducts);

  return (
    <div className="bg-black border border-gray-700 rounded-lg">
      <div className="bg-black px-6 py-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Order Summary</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between text-white">
          <span>Subtotal ({common?.selectedProducts?.length || 0} items)</span>
          <span>{mainPrice(total)}</span>
        </div>
        <div className="flex justify-between text-white">
          <span>Shipping Fee</span>
          <span>{mainPrice(common?.selectedShippingOption?.fee || 0)}</span>
        </div>

        <VoucherApply totalPrice={total || 0} />

        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between font-bold text-lg text-white">
            <span>Total</span>
            <span>
              {" "}
              {total > 0
                ? mainPrice(
                    total +
                      common?.selectedShippingOption?.fee -
                      common?.voucher?.amount
                  )
                : "BDT 0"}
            </span>
          </div>
        </div>

        {/* Place Order Button */}
        <CreateOrderButton totalItems={common?.selectedProducts?.length} />
      </div>
    </div>
  );
}
