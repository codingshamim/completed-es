"use client";

import { getProductByIdAction } from "@/app/backend/actions";
import useCommonState from "@/app/src/hooks/useCommonState";
import formatePrice from "@/helpers/formatePrice";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import React from "react";
import AddCart from "../AddCart";
import mainPrice from "@/helpers/mainPrice";
import ReusableImage from "@/app/_components/ReusableImage";

const BuyModal = React.memo(function BuyModal() {
  const { common, setCommon } = useCommonState();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);
  const [activeSize, setActiveSize] = useState("");

  const originalPrice = useMemo(
    () => formatePrice(product?.price * count, product?.discount),
    [product, count]
  );

  useEffect(() => {
    const fetchProductById = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getProductByIdAction(common?.productId);
        if (result) {
          setProduct(result);
          setActiveSize(common?.size ? common?.size : result?.sizes[0]);
        }
      } catch (err) {
        setError("Failed to fetch product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (common?.buyModal && common?.productId) {
      fetchProductById();
    }
  }, [common?.productId, common?.buyModal, common?.size]);

  useEffect(() => {
    setCount(common?.quantity);
  }, [common?.quantity]);

  const increament = () => {
    if (count !== common?.stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  if (!common?.buyModal) return null;

  const handleClose = () => {
    setCommon({
      ...common,
      buyModal: false,
      productId: "",
      mode: "",
      quantity: 1,
      size: "",
    });
    setError(null);
    setCount(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-end md:items-center justify-center">
      {/* Desktop backdrop click to close */}
      <div className="absolute inset-0 hidden md:block" onClick={handleClose} />

      {/* Modal Container */}
      <div className="relative bg-black w-full max-w-lg md:max-w-2xl mx-4 md:rounded-2xl overflow-hidden shadow-2xl border border-gray-800 max-h-[90vh] md:max-h-[85vh] flex flex-col">
        {/* Mobile Handle Bar (YouTube style) */}
        <div className="md:hidden flex justify-center py-2 bg-black border-b border-gray-800">
          <div className="w-10 h-1 bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black">
          <h2 className="text-lg font-semibold text-white">Product Details</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-gray-300 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="w-16 h-16 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-red-400 text-center">{error}</p>
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {/* Product Image and Basic Info */}
              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  {product?.thumbnail && (
                    <ReusableImage
                      width={120}
                      height={120}
                      className="w-20 h-20 md:w-28 md:h-28 rounded-xl border border-gray-700"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-white font-semibold text-lg leading-tight mb-2 line-clamp-2">
                    {product?.title}
                  </h1>

                  {/* Price Section */}
                  <div className="flex items-baseline gap-2 mb-2">
                    {product?.discount > 0 && (
                      <del className="text-gray-500 text-sm">
                        {mainPrice(product?.price * count)}
                      </del>
                    )}
                    <span className="text-xl font-bold text-white">
                      {originalPrice}
                    </span>
                  </div>

                  {/* Stock Warning */}
                  {common?.stock <= 10 && (
                    <div className="inline-flex items-center text-xs text-orange-400 bg-orange-900 bg-opacity-20 px-2 py-1 rounded-md border border-orange-800">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Only {common?.stock} items left
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="bg-black bg-opacity-50 rounded-xl p-4 border border-gray-700">
                <h3 className="text-white font-medium mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    className="w-10 h-10 bg-black hover:bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={decrement}
                    disabled={count <= 1}
                  >
                    -
                  </button>
                  <div className="flex-1 max-w-20">
                    <input
                      type="text"
                      value={count}
                      readOnly
                      className="w-full text-center bg-black border border-gray-600 rounded-lg px-3 py-2 text-white font-medium outline-none"
                    />
                  </div>
                  <button
                    className="w-10 h-10 bg-black hover:bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={increament}
                    disabled={count >= common?.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              {product?.sizes && product.sizes.length > 0 && (
                <div className="bg-black bg-opacity-50 rounded-xl p-4 border border-gray-700">
                  <h3 className="text-white font-medium mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`size-10 rounded-sm border transition-all duration-200 font-medium ${
                          activeSize === size
                            ? "bg-white border-white text-black shadow-lg"
                            : "bg-black border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                        }`}
                        onClick={() => setActiveSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with Add to Cart Button */}
        {!loading && !error && (
          <div className="border-t border-gray-800 bg-black p-4">
            <AddCart
              productId={common?.productId}
              quantity={count}
              size={activeSize}
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default BuyModal;
