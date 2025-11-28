"use client";

import AddCart from "@/app/components/AddCart";
import formatePrice from "@/helpers/formatePrice";
import mainPrice from "@/helpers/mainPrice";
import Link from "next/link";
import { useState } from "react";

export default function ProductOrder({
  stock,
  sizes = [],
  productId,
  originalPrice,
  discount,
}) {
  const [activeSize, setActiveSize] = useState(sizes[0] || null);
  const [count, setCount] = useState(1);
  const price = formatePrice(originalPrice, discount, count);

  const increament = () => setCount(count + 1);
  const decrement = () => count > 1 && setCount(count - 1);

  return (
    <>
      <p className="mt-2">
        <del className="text-gray-300 text-sm mr-2">
          {mainPrice(originalPrice * count)}
        </del>{" "}
        {price}
      </p>

      <div className="mt-4 text-sm flex items-center gap-2">
        {sizes?.map((sizeObj, index) => (
          <button
            key={index}
            className={`nav-border ${
              activeSize === sizeObj ? "btn" : "variable-btn"
            }`}
            onClick={() => setActiveSize(sizeObj)}
          >
            {sizeObj.size} {/* ✅ display only the size string */}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <button className="variable-btn nav-border" onClick={decrement}>
          -
        </button>
        <input
          type="text"
          value={count}
          className="text-center bg-transparent border px-4 w-[60px] h-[30px] outline-none"
          readOnly
        />
        <button className="variable-btn nav-border" onClick={increament}>
          +
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {stock === 0 ? (
          <button className="variable-btn nav-border text-red-600">
            Out Of Stock
          </button>
        ) : (
          <div className="flex md:w-max w-full flex-col md:flex-row gap-4">
            <Link
              href={`/checkout?product=${productId}&quantity=${count}&size=${activeSize?.size}`}
              className="py-2 w-full md:w-max justify-center flex items-center gap-1 px-4 font-medium active:scale-[98%] transition-all duration-300 rounded-sm new-btn hover:border-transparent nav-border text-black text-sm"
            >
              এখনই কিনুন
            </Link>

            <div className="w-full md:w-max">
              <AddCart
                size={activeSize}
                quantity={count}
                productId={productId}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
