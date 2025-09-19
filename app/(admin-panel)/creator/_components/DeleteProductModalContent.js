import Image from "next/image";

export default function DeleteProductModalContent({ thumbnail, sku, title }) {
  return (
    <>
      {/* Product Info */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-4 mb-6 border border-gray-600/30">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12  rounded-xl ">
            <Image
              src={thumbnail}
              alt={title}
              width={48}
              height={48}
              className="object-cover rounded-xl"
            />
          </div>
          <div>
            <p className="font-semibold text-white" id="productName">
              {title?.length > 25 ? title.slice(0, 25) + "..." : title}
            </p>
            <p className="text-sm text-gray-400">
              SKU: <span id="productSku">{sku}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Warning Message */}
      <div className="text-center mb-8">
        <p className="text-gray-300 leading-relaxed">
          Are you absolutely sure you want to delete this product?
          <span className="text-red-400 font-semibold">
            This action cannot be undone
          </span>
          and will permanently remove the product from your inventory.
        </p>
      </div>
    </>
  );
}
