import ReusableImage from "@/app/_components/ReusableImage";
import { getProductByIdAction } from "@/app/backend/actions";
import formatePrice from "@/helpers/formatePrice";
import mainPrice from "@/helpers/mainPrice";

export default async function OrderItem({ order }) {
  const product = await getProductByIdAction(order?.productId);

  return (
    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-gray-900/30 rounded-lg">
      <ReusableImage
        width={100}
        className="size-[60px] xs:size-[70px] sm:size-[80px] flex-shrink-0"
        height={100}
        src={product?.thumbnail}
        alt={product?.title || "Unknown title"}
      />
      <div className="flex-1 min-w-0 w-full xs:w-auto">
        <div className="font-medium text-white text-sm sm:text-base break-words">
          {product?.title || "Unknown Title"}
        </div>
        <div className="text-xs sm:text-sm text-gray-400">
          Size:{order?.size || "S"}
        </div>
        <div className="text-xs sm:text-sm text-gray-400">
          Quantity: {order?.quantity || 0}
        </div>
      </div>
      <div className="text-left xs:text-right w-full xs:w-auto flex-shrink-0">
        <div className="font-medium text-white text-sm sm:text-base">
          {formatePrice(product?.price, product?.discount)}
        </div>
        {order?.quantity > 1 && (
          <div className="text-xs text-gray-400">
            {mainPrice((order?.price * order?.quantity).toFixed(2))} total
          </div>
        )}
      </div>
    </div>
  );
}
