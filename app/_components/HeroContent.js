import formatePrice from "@/helpers/formatePrice";
import Link from "next/link";

import mainPrice from "@/helpers/mainPrice";

export default function HeroContent({
  title,
  originalPrice,
  discount,
  ability,
  slug,
  stock,
}) {
  const price = formatePrice(originalPrice, discount);

  return (
    <div className="hero-content w-full md:w-[60%] p-6 bg-black text-white">
      {/* Discount Badge */}
      <div className="inline-flex items-center">
        <span className="bg-white text-black text-sm font-medium px-4 py-2 rounded-sm shadow-lg">
          {discount}% Discount
        </span>
      </div>

      {/* Product Title */}
      <h1 className="mt-4 mb-3 text-3xl md:text-4xl font-bold text-white leading-tight">
        <Link
          href={`/tshirt/${slug}`}
          className="hover:text-gray-300  transition-colors duration-300"
        >
          {title}
        </Link>
      </h1>

      {/* Fabric Section */}
      <div className="mt-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-3 border-l-4 border-green-600 pl-3">
          Fabric
        </h2>
        {ability && (
          <ul className="space-y-2 ml-4">
            {ability.map((abl, index) => (
              <li
                key={index}
                className="text-gray-300 text-sm flex items-center"
              >
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3 flex-shrink-0"></span>
                {abl || "Unknown"}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Section */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-lg line-through">
            {mainPrice(originalPrice)}
          </span>
          <span className="text-2xl font-bold text-white"> {price}</span>
        </div>
      </div>

      {/* Stock Warning */}
      {stock <= 10 && stock > 0 && (
        <div className="mb-4 mt-4">
          <p className="text-yellow-400  items-center  inline-block  text-sm font-medium bg-yellow-900/20 px-3 py-2 rounded-lg ">
            <span className="flex items-center gap-2">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shield-alert-icon lucide-shield-alert"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
              Only {stock} {stock > 1 ? "Items" : "Item"} Available
            </span>
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6">
        {stock === 0 ? (
          <button
            disabled
            className="bg-gray-700 text-gray-400 px-8 py-3 rounded-lg font-semibold cursor-not-allowed border border-gray-600"
          >
            Out of Stock
          </button>
        ) : (
          <Link
            href={`/tshirt/${slug}`}
            className="py-2 hover:bg-[#e0e0e0] flex items-center w-[140px] gap-2 px-4 font-medium active:scale-[98%] transition-all duration-300 rounded-sm bg-white text-black text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-bag-icon lucide-shopping-bag"
            >
              <path d="M16 10a4 4 0 0 1-8 0" />
              <path d="M3.103 6.034h17.794" />
              <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
            </svg>
            Add to cart
          </Link>
        )}
      </div>

      {/* Additional Product Info */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="flex flex-wrap gap-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Premium Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
