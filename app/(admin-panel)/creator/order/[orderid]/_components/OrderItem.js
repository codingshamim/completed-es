import ReusableImage from "@/app/_components/ReusableImage";
import { getProductByIdAction } from "@/app/backend/actions";
import formatePrice from "@/helpers/formatePrice";
import Image from "next/image";

export default async function OrderItem({ order }) {
  const product = await getProductByIdAction(order.productId);

  return (
    <div className="flex items-center space-x-6">
      <div className="relative">
        <ReusableImage
          width={80}
          height={80}
          src={product?.thumbnail}
          alt={product?.title || "Unknown title"}
          className="w-20 h-20 rounded-lg  border-2 border-gray-600"
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs font-bold text-white">
          {order?.quantity || 0}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="text-xl font-semibold text-white mb-2">
          {product?.title || "Invalid title"}
        </h4>
        <div className="flex items-center space-x-4 mb-3">
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm text-gray-300">
            Size: {order?.size || 0}
          </span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm text-white">
            Qty: {order?.quantity || 0}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-gray-400">
            <span className="text-lg font-medium text-white">
              {formatePrice(product?.price, product?.discount)}
            </span>{" "}
            each
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">
              {formatePrice(product?.price, product?.discount, order?.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
