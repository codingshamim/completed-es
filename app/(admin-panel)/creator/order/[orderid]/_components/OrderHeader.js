import InvoiceDownloadButton from "@/app/(pages)/(profile)/dashboard/order/[id]/_components/InvoiceDownloadButton";
import { ArrowDownToLine } from "lucide-react";

export default function OrderHeader({ transactionId, order }) {
  return (
    <div className="bg-black border-b border-gray-800">
      <div className=" mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-xl font-bold text-white">Order Details</h1>
              <p className="text-gray-400 mt-1">
                Transaction ID: {transactionId}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <InvoiceDownloadButton order={order}>
              <ArrowDownToLine />
              <span className="hidden md:block"> Download Invoice</span>
            </InvoiceDownloadButton>
          </div>
        </div>
      </div>
    </div>
  );
}
