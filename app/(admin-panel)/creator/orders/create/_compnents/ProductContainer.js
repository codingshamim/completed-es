"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function ProductContainer({ product, children }) {
  const { common, setCommon } = useCommonState();
  const handleAddToOrder = () => {
    // Logic to add the product to the order
    const orderItem = {
      productId: product._id,
      quantity: 1,
      price: product?.price - (product?.price / 100) * product?.discount,
      size: product?.sizes[0] || "",
      thumbnail: product?.thumbnail || "",
      title: product?.title || "Untitled",
      sku: product?.sku || "",
      sizes: product?.sizes,
    };
    const isExistItem = common.selectedProducts.find(
      (item) => item.productId === product._id
    );
    if (isExistItem) {
      setCommon({
        ...common,
        selectedProducts: common.selectedProducts.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
      return;
    }
    setCommon({
      ...common,
      selectedProducts: [...common.selectedProducts, orderItem],
    });
  };

  return (
    <div className="bg-black  border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all duration-300">
      {children}
      <button
        onClick={handleAddToOrder}
        type="button"
        disabled={product.stock === 0}
        className={`w-full mt-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
          product.stock === 0
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-white active:scale-[98%] hover:bg-white/80 text-black"
        }`}
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Order"}
      </button>
    </div>
  );
}
