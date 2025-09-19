import ReusableImage from "@/app/_components/ReusableImage";
import { getProductByIdAction } from "@/app/backend/actions";
import formatePrice from "@/helpers/formatePrice";
import mainPrice from "@/helpers/mainPrice";

export default async function OrderItem({ order }) {
  const product = await getProductByIdAction(order?.productId);

  return (
    <div className="flex items-center  space-x-4 p-4 bg-gray-900/30 rounded-lg">
      <ReusableImage
        width={100}
        className="size-[80px]"
        height={100}
        src={product?.thumbnail}
        alt={product?.title || "Unknown title"}
      />
      <div className="flex-1">
        <div className="font-medium text-white">
          {product?.title || "Unknown Title"}
        </div>
        <div className="text-sm text-gray-400">Size:{order?.size || "S"}</div>
        <div className="text-sm text-gray-400">
          Quantity: {order?.quantity || 0}
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium text-white">
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
