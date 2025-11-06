import ReusableImage from "@/app/_components/ReusableImage";
import { getProductByIdAction } from "@/app/backend/actions";
import formatePrice from "@/helpers/formatePrice";
import mainPrice from "@/helpers/mainPrice";

export default async function OrderItem({ order }) {
  const product = await getProductByIdAction(order?.productId);

  return (
    <div className=" border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <ReusableImage
            width={100}
            height={100}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover bg-zinc-800"
            src={product?.thumbnail}
            alt={product?.title || "Product"}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm sm:text-base mb-2 line-clamp-2">
            {product?.title || "Unknown Title"}
          </h3>

          <div className="space-y-1">
            <div className="flex items-center gap-4 text-xs sm:text-sm text-zinc-400">
              <span>
                Size:{" "}
                <span className="text-white font-medium">
                  {order?.size || "M"}
                </span>
              </span>
              <span>
                Qty:{" "}
                <span className="text-white font-medium">
                  {order?.quantity || 1}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <div className="flex justify-between items-center">
          <span className="text-zinc-400 text-sm">Unit Price:</span>
          <span className="text-white font-semibold">
            {formatePrice(product?.price, product?.discount)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-white font-semibold">Total Price:</span>
          <span className="text-white font-bold text-lg">
            {mainPrice((order?.price * order?.quantity).toFixed(2))}
          </span>
        </div>
      </div>
    </div>
  );
}
