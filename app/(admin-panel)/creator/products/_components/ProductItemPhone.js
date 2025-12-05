import formatePrice from "@/helpers/formatePrice";
import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";
import ReusableImage from "@/app/_components/ReusableImage";

export default function ProductItemPhone({ product }) {
  return (
    <div className="p-4 hover:bg-dark-800/30 transition-colors">
      <div className="bg-gradient-to-br from-dark-800/60 to-dark-900/60 rounded-2xl p-4 border border-gray-700/50">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <ReusableImage
                width={80}
                height={80}
                src={product.thumbnail}
                alt={product.title}
                className="w-20 h-20 rounded-2xl border-2 border-gray-600/50"
              />
              <div
                className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                  product.status === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {product.status === "active" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check-icon lucide-check"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-alert-icon lucide-circle-alert"
                  >
                    <circle cx={12} cy={12} r={10} />
                    <line x1={12} x2={12} y1={8} y2={12} />
                    <line x1={12} x2="12.01" y1={16} y2={16} />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link
              href={`/tshirt/${product.slug}`}
              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye-icon lucide-eye"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx={12} cy={12} r={3} />
              </svg>
            </Link>
            <button className="p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil-icon lucide-pencil"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mb-4">
          <div className="text-lg font-semibold text-white mb-1">
            {product.title}
          </div>
          <div className="text-sm text-gray-400 mb-2">
            {product?.description.length > 100
              ? product?.description.slice(0, 100) + "..."
              : product?.description}
          </div>
          <div className="text-xs text-gray-500">SKU: {product.sku}</div>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Price */}
          <div className="bg-dark-800/50 col-span-2 rounded-xl p-3">
            <div className="text-xs text-gray-400 mb-1">Price</div>
            <div className=" font-bold text-white">
              {formatePrice(product.price, product?.discount)}
            </div>
          </div>

          {/* Stock */}
          <div className="bg-dark-800/50 col-span-2 rounded-xl p-3">
            <div className="text-xs text-gray-400 mb-1">Stock</div>
            <div
              className={` ${
                product.stock < 10 ? "text-red-400" : "text-white"
              }`}
            >
              {product.stock > 0 ? `${product?.stock} Pieces` : "Stock Out"}
            </div>
          </div>

          {/* Category */}
          <div className="bg-dark-800/50 rounded-xl p-3 col-span-2">
            <div className="text-xs text-gray-400 mb-2">Category</div>
            <span
              className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${
                product.category === "Hoodie"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600"
              }`}
            >
              {product.category}
            </span>
          </div>

          {/* Sizes */}
          <div className="bg-dark-800/50 rounded-xl p-3 col-span-2">
            <div className="text-xs text-gray-400 mb-1">Sizes</div>
            <select className="bg-transparent">
              {product.sizes.map((size, index) => (
                <option className="bg-black" key={index}>
                  {size?.size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center justify-between capitalize">
          <span
            className={`px-3 py-2 text-xs font-semibold text-white rounded-full shadow-lg flex items-center ${
              product.status === "active"
                ? "bg-gradient-to-r from-green-600 to-emerald-600"
                : "bg-gradient-to-r from-red-600 to-pink-600"
            }`}
          >
            <div className="w-2 h-2 bg-white rounded-full mr-2  animate-pulse" />
            {product.status}
          </span>
          <div className="flex space-x-2">
            <Link
              href={`/tshirt/${product.slug}`}
              className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye-icon lucide-eye"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx={12} cy={12} r={3} />
              </svg>
            </Link>
            <DeleteProductButton
              productId={product._id}
              title={product.title}
              sku={product.sku}
              thumbnail={product.thumbnail}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
