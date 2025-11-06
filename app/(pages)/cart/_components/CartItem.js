import mainPrice from "@/helpers/mainPrice";
import Image from "next/image";
import DeleteCartButton from "./DeleteCartButton";
import EditCartButton from "./EditCartButton";
import ReusableImage from "@/app/_components/ReusableImage";

export default function CartItem({
  thumbnail,
  title,
  price,
  quantity,
  size,
  cartId,
  stock,
  productId,
  mode,
}) {
  const originalPrice = mainPrice(price);
  const totalPrice = mainPrice(price * quantity);

  return (
    <div className="nav-border shadow-lg p-3 mt-2 rounded-lg">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex gap-3">
          {/* Image */}
          <div className="flex-shrink-0 w-24 h-24">
            <ReusableImage
              width={1200}
              height={720}
              className="w-full h-full object-cover rounded"
              src={thumbnail}
              alt={title}
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <h1 className="text-sm font-medium line-clamp-2">{title}</h1>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Size:</span>
                <span className="text-gray-300">{size}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Qty:</span>
                <span className="text-gray-300">{quantity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Unit Price:</span>
            <span className="text-sm text-gray-300">{originalPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Price:</span>
            <span className="text-base font-semibold">{totalPrice}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {mode !== "checkout" && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-700">
            <EditCartButton
              quantity={quantity}
              size={size}
              cartId={cartId}
              stock={stock}
              productId={productId}
            />
            <DeleteCartButton cartId={cartId} />
          </div>
        )}
      </div>

      {/* Desktop Layout - Original */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center">
        <ReusableImage
          width={1200}
          height={720}
          className="col-span-1 w-full h-full object-cover rounded"
          src={thumbnail}
          alt={title}
        />
        <div className="col-span-3 flex items-center">
          <h1>{title}</h1>
        </div>
        <div
          className={`${
            mode === "checkout" ? "col-span-3" : "col-span-2"
          } flex justify-center items-center`}
        >
          <p className="text-gray-300 text-xs">{originalPrice}</p>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <p className="text-gray-300 text-xs">{quantity}</p>
        </div>
        <div
          className={`flex justify-center items-center ${
            mode === "checkout" ? "col-span-2" : "col-span-1"
          }`}
        >
          <p className="text-gray-300 text-xs">{size}</p>
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <p className="text-gray-300 text-xs">{totalPrice}</p>
        </div>
        {mode !== "checkout" && (
          <div className="col-span-2 flex items-center gap-2">
            <EditCartButton
              quantity={quantity}
              size={size}
              cartId={cartId}
              stock={stock}
              productId={productId}
            />
            <DeleteCartButton cartId={cartId} />
          </div>
        )}
      </div>
    </div>
  );
}
