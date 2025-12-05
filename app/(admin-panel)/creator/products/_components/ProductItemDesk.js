import formatePrice from "@/helpers/formatePrice";
import mainPrice from "@/helpers/mainPrice";
import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";
import ReusableImage from "@/app/_components/ReusableImage";

export default function ProductItemDesk({ product }) {
  return (
    <tr className="border-b border-gray-800 hover:bg-secondary/50 transition-all duration-200">
      <td className="px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <ReusableImage
              src={product.thumbnail}
              alt={product.title}
              width={64}
              height={64}
              className="w-16 h-16 rounded-xl object-cover border border-gray-800"
            />
          </div>
          <div className="flex-1 min-w-0 max-w-md">
            <div className="text-base font-semibold text-white mb-1 truncate">
              {product.title ? product?.title : ""}
            </div>
            <div className="text-sm text-gray-400 mb-2 line-clamp-2 overflow-hidden">
              {product?.description.length > 80
                ? product?.description.slice(0, 80) + "..."
                : product?.description}
            </div>
            <div className="text-xs text-gray-500 truncate">
              SKU:{" "}
              <span className="text-gray-400 font-mono">{product.sku}</span>
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-6">
        <span className="px-3 py-2 text-xs font-semibold text-white bg-secondary rounded-lg border border-gray-800 inline-flex items-center gap-2 whitespace-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <path d="M6 3h12l4 6-10 13L2 9Z" />
          </svg>
          {product.category}
        </span>
      </td>

      <td className="px-6 py-6">
        <div className="flex flex-col gap-1">
          <div className="text-base font-bold text-white whitespace-nowrap">
            {formatePrice(product?.price, product?.discount)}
          </div>
          {product?.discount > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <del className="text-gray-500 text-xs whitespace-nowrap">
                {mainPrice(product.price)}
              </del>
              <span className="text-xs font-semibold text-white bg-secondary px-2 py-0.5 rounded whitespace-nowrap">
                -{product.discount}%
              </span>
            </div>
          )}
        </div>
      </td>

      <td className="px-6 py-6">
        <div className="flex flex-col gap-1">
          <div
            className={`text-base font-bold whitespace-nowrap ${
              product.stock === 0
                ? "text-gray-500"
                : product.stock < 10
                ? "text-white"
                : "text-white"
            }`}
          >
            {product.stock > 0 ? product?.stock : "0"}
          </div>
          {product.stock === 0 && (
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              Out of Stock
            </span>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <span className="text-xs text-white bg-secondary px-2 py-0.5 rounded whitespace-nowrap">
              Low Stock
            </span>
          )}
        </div>
      </td>

      <td className="px-6 py-6">
        <span
          className={`px-3 py-2 text-xs font-semibold text-white rounded-lg inline-flex items-center gap-2 capitalize whitespace-nowrap ${
            product.status === "active"
              ? "bg-secondary border border-gray-800"
              : "bg-black border border-gray-800"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              product.status === "active" ? "bg-white" : "bg-gray-600"
            } ${product.status === "active" ? "animate-pulse" : ""}`}
          />
          {product.status}
        </span>
      </td>

      <td className="px-6 py-6">
        <div className="flex flex-wrap gap-1.5 max-w-[120px]">
          {product.sizes.map((size, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-semibold text-white bg-secondary rounded border border-gray-800 whitespace-nowrap"
            >
              {size?.size}
            </span>
          ))}
        </div>
      </td>

      <td className="px-6 py-6">
        <div className="flex items-center justify-center gap-2 flex-nowrap">
          <Link
            href={`/tshirt/${product.slug}`}
            className="p-2 text-white hover:text-white bg-secondary hover:bg-gray-700 border border-gray-800 rounded-lg transition-all duration-200 flex-shrink-0"
            title="View Product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx={12} cy={12} r={3} />
            </svg>
          </Link>

          <Link
            href={`/creator/product/edit/${product.slug}`}
            className="p-2 text-white hover:text-white bg-secondary hover:bg-gray-700 border border-gray-800 rounded-lg transition-all duration-200 flex-shrink-0"
            title="Edit Product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
              <path d="m15 5 4 4" />
            </svg>
          </Link>

          <DeleteProductButton
            productId={product._id}
            title={product.title}
            sku={product.sku}
            thumbnail={product.thumbnail}
          />
        </div>
      </td>
    </tr>
  );
}
