import formatePrice from "@/helpers/formatePrice";
import Image from "next/image";
import Link from "next/link";
import CartModalAction from "./CartModalAction";
import AnimationContainer from "./AnimationContainer";
import mainPrice from "@/helpers/mainPrice";
import ReusableImage from "../_components/ReusableImage";

export default function ProductItem({
  title,
  description,
  thumbnail,
  price,
  discount,
  slug,
  stock,
  id,
}) {
  const originalPrice = formatePrice(price, discount);

  return (
    <AnimationContainer>
      <div className="group bg-black rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-800 hover:border-gray-700">
        <div className="relative overflow-hidden">
          <ReusableImage
            src={thumbnail}
            alt={title}
            width={1200}
            height={1200}
            href={`/tshirt/${slug}`}
            className="w-full h-[300px]  group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
              -{discount}%
            </div>
          )}

          {/* Stock Badge */}
          {stock <= 10 && stock > 0 && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md">
              Only {stock} left
            </div>
          )}

          {stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <Link href={`/tshirt/${slug}`} className="block">
            <h1 className="font-semibold text-white hover:underline transition-colors duration-200 line-clamp-2 mb-2">
              {title || "Title"}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
              {description || "Description"}
            </p>
          </Link>

          {/* Price Section */}
          <div className="flex items-baseline gap-2 mb-2">
            {discount > 0 && (
              <del className="text-gray-500 text-sm">
                {mainPrice(price || 0)}
              </del>
            )}
            <span className=" font-bold text-white">{originalPrice || 0}</span>
          </div>
          {discount > 0 && (
            <span className="text-green-400 text-sm font-medium mb-2">
              Save {mainPrice((price / 100) * discount) || 0}
            </span>
          )}
          {/* Stock Warning */}
          {stock <= 10 && stock > 0 && (
            <div className="mb-4 mt-2">
              <span className="inline-flex items-center text-sm text-orange-400 bg-orange-900 bg-opacity-20 px-2 py-1 rounded-md border border-orange-800">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Only {stock} {stock > 1 ? "items" : "item"} available
              </span>
            </div>
          )}

          {/* Action Button */}
          {stock === 0 ? (
            <button
              disabled
              className="w-full py-3 px-4 bg-gray-800 text-gray-500 rounded-lg font-medium cursor-not-allowed border border-gray-700 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L12 21l-7.5-7.5M5.636 5.636L12 3l7.5 7.5"
                />
              </svg>
              Out of Stock
            </button>
          ) : (
            <div className="w-full">
              <CartModalAction
                title="এখনই কিনুন"
                stock={stock || 0}
                id={id || ""}
              />
            </div>
          )}
        </div>
      </div>
    </AnimationContainer>
  );
}
