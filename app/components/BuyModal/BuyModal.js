"use client";

import { getProductByIdAction } from "@/app/backend/actions";
import useCommonState from "@/app/src/hooks/useCommonState";
import formatePrice from "@/helpers/formatePrice";

import { useEffect, useState, useMemo, useRef } from "react";
import React from "react";
import AddCart from "../AddCart";
import mainPrice from "@/helpers/mainPrice";
import ReusableImage from "@/app/_components/ReusableImage";
import Link from "next/link";

const BuyModal = React.memo(function BuyModal() {
  const { common, setCommon } = useCommonState();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);
  const [activeSize, setActiveSize] = useState("");
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const modalRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const originalPrice = useMemo(
    () => formatePrice(product?.price * count, product?.discount),
    [product, count]
  );

  // Get active size stock
  const activeSizeStock = useMemo(() => {
    if (!activeSize || !product?.sizes) return 0;
    return activeSize?.stock || 0;
  }, [activeSize, product?.sizes]);

  // Calculate size stock information
  const sizeStockInfo = useMemo(() => {
    if (!product?.sizes || product.sizes.length === 0) {
      return {
        totalStock: common?.stock || 0,
        lowStockSizes: [],
        outOfStockSizes: [],
      };
    }

    const totalStock = product.sizes.reduce(
      (sum, size) => sum + (size.stock || 0),
      0
    );
    const lowStockSizes = product.sizes.filter(
      (size) => size.stock > 0 && size.stock <= 10
    );
    const outOfStockSizes = product.sizes.filter((size) => size.stock === 0);

    return { totalStock, lowStockSizes, outOfStockSizes };
  }, [product?.sizes, common?.stock]);

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
    const maxStock = activeSizeStock || common?.stock;
    if (count < maxStock) {
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
    setTranslateY(0);
  };

  // Touch event handlers for swipe gesture
  const handleTouchStart = (e) => {
    const scrollContainer = modalRef.current?.querySelector(".overflow-y-auto");
    if (scrollContainer && scrollContainer.scrollTop > 0) {
      return;
    }

    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const scrollContainer = modalRef.current?.querySelector(".overflow-y-auto");
    if (scrollContainer && scrollContainer.scrollTop > 0) {
      return;
    }

    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;

    if (diff > 0) {
      setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (translateY > 150) {
      handleClose();
    } else {
      setTranslateY(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 hidden md:block" onClick={handleClose} />

      <div
        ref={modalRef}
        className="relative bg-black w-full md:max-w-2xl mx-4 md:rounded-2xl overflow-hidden shadow-2xl border border-gray-800 max-h-[90vh] md:max-h-[85vh] flex flex-col transition-transform duration-200 ease-out"
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      >
        {/* Mobile Handle Bar */}
        <div
          className="md:hidden flex justify-center py-2 bg-black border-b border-gray-800 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-10 h-1 bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black">
          <h2 className="text-lg font-semibold text-white bangla-font">
            প্রোডাক্ট বিস্তারিত
          </h2>
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
                  <div className="flex flex-col md:flex-row items-baseline gap-2 mb-2">
                    {product?.discount > 0 && (
                      <del className="text-gray-500 text-sm">
                        {mainPrice(product?.price * count)}
                      </del>
                    )}
                    <span className="text-xl font-bold text-white">
                      {originalPrice}
                    </span>
                  </div>

                  {/* Active Size Stock Warning */}
                  {activeSize &&
                    activeSizeStock <= 10 &&
                    activeSizeStock > 0 && (
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
                        Only {activeSizeStock} items left in size{" "}
                        {activeSize?.size}
                      </div>
                    )}
                </div>
              </div>

              {/* Size-wise Stock Overview */}
              {product?.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  {/* Low Stock Sizes */}
                  {sizeStockInfo.lowStockSizes.length > 0 && (
                    <div className="text-sm">
                      <div className="flex items-start text-orange-400 bg-orange-900 bg-opacity-20 px-3 py-2 rounded-lg border border-orange-800">
                        <svg
                          className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="flex-1">
                          <span className="font-medium bangla-font">
                            কম স্টক:
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {sizeStockInfo.lowStockSizes.map((size) => (
                              <span
                                key={size._id}
                                className="inline-block bg-orange-800 bg-opacity-30 px-2 py-1 rounded text-xs font-medium"
                              >
                                {size.size}: {size.stock} টি বাকি
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Out of Stock Sizes */}
                  {sizeStockInfo.outOfStockSizes.length > 0 &&
                    sizeStockInfo.outOfStockSizes.length <
                      product.sizes.length && (
                      <div className="text-sm">
                        <div className="flex items-start text-red-400 bg-red-900 bg-opacity-20 px-3 py-2 rounded-lg border border-red-800">
                          <svg
                            className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <div className="flex-1">
                            <span className="font-medium bangla-font">
                              স্টক শেষ:
                            </span>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {sizeStockInfo.outOfStockSizes.map((size) => (
                                <span
                                  key={size._id}
                                  className="inline-block bg-red-800 bg-opacity-30 px-2 py-1 rounded text-xs font-medium line-through"
                                >
                                  {size.size}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="bg-black bg-opacity-50 rounded-xl p-4 border border-gray-700">
                <h3 className="text-white font-medium mb-3 bangla-font">
                  পরিমাণ
                </h3>
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
                    disabled={count >= (activeSizeStock || common?.stock)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              {product?.sizes && product.sizes.length > 0 && (
                <div className="bg-black bg-opacity-50 rounded-xl p-4 border border-gray-700">
                  <h3 className="text-white font-medium mb-3 bangla-font">
                    সাইজ
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        disabled={size.stock === 0}
                        className={`size-10 rounded-sm border transition-all duration-200 font-medium relative ${
                          activeSize?.size === size?.size
                            ? "bg-white border-white text-black shadow-lg"
                            : size.stock === 0
                            ? "bg-gray-900 border-gray-700 text-gray-600 cursor-not-allowed opacity-50"
                            : "bg-black border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                        }`}
                        onClick={() => setActiveSize(size)}
                      >
                        {size?.size}
                        {size.stock === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                          </div>
                        )}
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
          <div className="border-t flex md:items-center flex-col md:flex-row gap-3 border-gray-800 bg-black p-4">
            <Link
              onClick={() => {
                setCommon({
                  ...common,
                  buyModal: false,
                  productId: "",
                  mode: "",
                  quantity: 1,
                  size: "",
                });
              }}
              href={`/checkout?product=${common?.productId}&quantity=${count}&size=${activeSize?.size}`}
              className="py-2 justify-center flex items-center gap-1 px-4 font-medium active:scale-[98%] transition-all duration-300 rounded-sm new-btn hover:border-transparent nav-border text-black text-sm"
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
                className="lucide lucide-shopping-cart group-hover:animate-bounce transition-transform duration-200"
              >
                <circle cx={8} cy={21} r={1} />
                <circle cx={19} cy={21} r={1} />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              এখনই কিনুন
            </Link>
            <AddCart
              productId={common?.productId}
              quantity={count}
              size={activeSize?.size}
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default BuyModal;
