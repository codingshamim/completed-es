"use client";

import AddCart from "@/app/components/AddCart";
import formatePrice from "@/helpers/formatePrice";
import mainPrice from "@/helpers/mainPrice";
import Link from "next/link"; // ✅ Correct import

import { useState } from "react";

export default function ProductOrder({
  stock,
  sizes,
  productId,
  originalPrice,
  discount,
}) {
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [count, setCount] = useState(1);
  const price = formatePrice(originalPrice, discount, count);

  const increament = () => setCount(count + 1);
  const decrement = () => count > 1 && setCount(count - 1);

  return (
    <>
      <p className="mt-2">
        <del className="text-gray-300 text-sm mr-2">
          {mainPrice(originalPrice * count)}{" "}
        </del>{" "}
        {price}
      </p>

      <div className="mt-4 text-sm flex items-center gap-2">
        {sizes?.map((size, index) => (
          <button
            key={index}
            className={`nav-border ${
              activeSize === size ? "btn" : "variable-btn"
            }`}
            onClick={() => setActiveSize(size)}
          >
            {size}
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
            {/* First Button */}
            <Link
              href={`/checkout?product=${productId}&quantity=${count}&size=${activeSize}`}
              className="py-2 w-full md:w-max justify-center flex items-center gap-1 px-4 font-medium active:scale-[98%] transition-all duration-300 rounded-sm new-btn hover:border-transparent nav-border text-black text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart transition-transform duration-200"
              >
                <circle cx={8} cy={21} r={1} />
                <circle cx={19} cy={21} r={1} />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              এখনই কিনুন
            </Link>

            {/* Second Button */}
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
