"use client";

import AddCart from "@/app/components/AddCart";
import formatePrice from "@/helpers/formatePrice";
import mainPrice from "@/helpers/mainPrice";

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
  const increament = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <>
      {" "}
      <p className="mt-2">
        <del className="text-gray-300 text-sm mr-2">
          {mainPrice(originalPrice * count)}{" "}
        </del>{" "}
        {price}
      </p>
      <div className="mt-4 text-sm flex items-center gap-2">
        {sizes?.map((size, index) => (
          <button
            className={`nav-border ${
              activeSize === size ? "btn" : " variable-btn"
            }`}
            onClick={() => setActiveSize(size)}
            key={index}
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
          <>
            <AddCart size={activeSize} quantity={count} productId={productId} />
          </>
        )}
      </div>
    </>
  );
}
