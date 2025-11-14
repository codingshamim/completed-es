import ReusableImage from "@/app/_components/ReusableImage";
import { getProductByIdAction } from "@/app/backend/actions";
import formatePrice from "@/helpers/formatePrice";

export default async function OrderItem({ order }) {
  const product = await getProductByIdAction(order.productId);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-0">
      {/* Image and Badge Container */}
      <div className="relative flex-shrink-0 w-20 h-20 sm:w-20 sm:h-20">
        <ReusableImage
          width={80}
          height={80}
          src={product?.thumbnail}
          alt={product?.title || "Unknown title"}
          className="w-full h-full rounded-lg border-2 border-gray-600 object-cover"
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs font-bold text-white">
          {order?.quantity || 0}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 space-y-3">
        {/* Title */}
        <h4 className="text-base sm:text-xl font-semibold text-white leading-tight">
          {product?.title || "Invalid title"}
        </h4>

        {/* Size and Quantity Tags - Mobile: Row, Desktop: Row */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="px-2 sm:px-3 py-1 bg-secondary rounded-lg text-xs sm:text-sm text-gray-300">
            Size: {order?.size || 0}
          </span>
          <span className="px-2 sm:px-3 py-1 bg-secondary rounded-lg text-xs sm:text-sm text-white">
            Qty: {order?.quantity || 0}
          </span>
        </div>

        {/* Price Section */}
        <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          {/* Unit Price */}
          <div className="text-gray-400 text-sm sm:text-base">
            <span className="text-base sm:text-lg font-medium text-white">
              {formatePrice(product?.price, product?.discount)}
            </span>{" "}
            <span className="text-xs sm:text-sm">each</span>
          </div>

          {/* Total Price */}
          <div className="text-left sm:text-right">
            <p className="text-sm text-gray-400 sm:hidden">Total Price:</p>
            <p className="text-xl sm:text-2xl font-bold text-white">
              {formatePrice(product?.price, product?.discount, order?.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
