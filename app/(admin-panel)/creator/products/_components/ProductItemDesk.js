import formatePrice from "@/helpers/formatePrice";
import mainPrice from "@/helpers/mainPrice";
import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";
import ReusableImage from "@/app/_components/ReusableImage";

export default function ProductItemDesk({ product }) {
  return (
    <tr className="hover:bg-dark-800/30 transition-colors group">
      <td className="px-6 py-6">
        <div className="flex items-center">
          <div className="relative">
            <ReusableImage
              src={product.thumbnail}
              alt={product.title}
              width={64}
              height={64}
              className="w-16 h-16 rounded-2xl  border-2 border-gray-600/50 group-hover:border-blue-500/50 transition-colors"
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
          <div className="ml-4">
            <div className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
              {product.title ? product?.title : ""}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {product?.description.length > 100
                ? product?.description.slice(0, 100) + "..."
                : product?.description}
            </div>
            <div className="text-xs text-gray-500 mt-1">SKU: {product.sku}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-6">
        <span
          className={`px-3 py-2 text-xs font-semibold text-white rounded-full shadow-lg ${
            product.category === "Hoodie"
              ? "bg-gradient-to-r from-purple-600 to-purple-700"
              : "bg-gradient-to-r from-blue-600 to-cyan-600"
          }`}
        >
          <i className="fas fa-tshirt mr-1" />
          {product.category}
        </span>
      </td>
      <td className="px-6 py-6 flex items-center mt-4 gap-2">
        <del className="text-gray-500 text-xs">{mainPrice(product.price)}</del>
        <div className=" font-bold text-white">
          {formatePrice(product?.price, product?.discount)}
        </div>
      </td>
      <td className="px-6 py-6">
        <div
          className={`text-lg font-semibold ${
            product.stock < 10 ? "text-red-400" : "text-white"
          }`}
        >
          {product.stock > 0 ? product?.stock : "Stock Out"}
        </div>
      </td>
      <td className="px-6 py-6  capitalize">
        <span
          className={`px-3 py-2 text-xs font-semibold text-white rounded-full shadow-lg flex items-center w-fit ${
            product.status === "active"
              ? "bg-gradient-to-r from-green-600 to-emerald-600"
              : "bg-gradient-to-r from-red-600 to-pink-600"
          }`}
        >
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
          {product.status}
        </span>
      </td>
      <td className="px-6 py-6">
        <select className="bg-transparent">
          {product.sizes.map((size, index) => (
            <option className="bg-black" key={index}>
              {size}
            </option>
          ))}
        </select>
      </td>
      <td className="px-6 py-6">
        <div className="flex items-center justify-center space-x-2">
          <Link
            href={`/tshirt/${product.slug}`}
            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200 tooltip"
            title="View Product"
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
          <Link
            href={`/creator/product/edit/${product.slug}`}
            className="p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-all duration-200 tooltip"
            title="Edit Product"
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
              className="lucide lucide-pencil-icon lucide-pencil"
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
