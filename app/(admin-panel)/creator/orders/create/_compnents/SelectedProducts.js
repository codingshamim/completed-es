"use client";

import ReusableImage from "@/app/_components/ReusableImage";
import useCommonState from "@/app/src/hooks/useCommonState";
import mainPrice from "@/helpers/mainPrice";

export default function SelectedProducts() {
  const { common, setCommon } = useCommonState();

  const updateProduct = (index, updatedFields) => {
    setCommon({
      ...common,
      selectedProducts: common.selectedProducts.map((prod, i) =>
        i === index ? { ...prod, ...updatedFields } : prod
      ),
    });
  };

  return (
    <>
      {common?.selectedProducts.length > 0 ? (
        <div className="divide-y divide-gray-700">
          {common.selectedProducts.map((item, index) => (
            <div key={index} className="px-3 sm:px-6 py-4">
              {/* Desktop Layout */}
              <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                {/* IMAGE */}
                <div className="col-span-1">
                  <ReusableImage
                    src={item?.thumbnail}
                    width={48}
                    height={48}
                    alt={item?.title}
                    className="w-12 h-12 rounded border border-gray-600"
                  />
                </div>

                {/* TITLE */}
                <div className="col-span-4">
                  <h4 className="font-medium text-white text-sm">
                    {item?.title || "Untitled"}
                  </h4>
                  <p className="text-gray-400 text-xs">SKU: {item?.sku}</p>
                </div>

                {/* PRICE */}
                <div className="col-span-2">
                  <span className="text-white font-medium">
                    {mainPrice(item.price)}
                  </span>
                </div>

                {/* QUANTITY */}
                <div className="col-span-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateProduct(index, {
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                    className="bg-black border border-gray-600 rounded px-2 py-1 w-16 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* SIZE SELECT */}
                <div className="col-span-1">
                  <select
                    value={item.size?.size}
                    onChange={(e) => {
                      const selectedSize = item.sizes.find(
                        (sz) => sz.size === e.target.value
                      );
                      updateProduct(index, { size: selectedSize });
                    }}
                    className="bg-black border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {item.sizes.map((sz) => (
                      <option key={sz.size} value={sz.size}>
                        {sz.size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TOTAL */}
                <div className="col-span-2">
                  <span className="font-bold text-white">
                    {mainPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>

              {/* Mobile / Tablet Layout */}
              <div className="lg:hidden space-y-3">
                {/* IMAGE + INFO */}
                <div className="flex gap-3">
                  <ReusableImage
                    src={item?.thumbnail}
                    width={64}
                    height={64}
                    alt={item?.title}
                    className="w-16 h-16 flex-shrink-0 rounded border border-gray-600"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm truncate">
                      {item?.title || "Untitled"}
                    </h4>
                    <p className="text-gray-400 text-xs">SKU: {item?.sku}</p>
                    <p className="text-white font-medium text-sm mt-1">
                      {mainPrice(item.price)}
                    </p>
                  </div>
                </div>

                {/* GRID CONTROLS */}
                <div className="grid grid-cols-3 gap-2">
                  {/* QUANTITY */}
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateProduct(index, {
                          quantity: parseInt(e.target.value) || 1,
                        })
                      }
                      className="bg-black border border-gray-600 rounded px-2 py-1 w-full text-sm text-white"
                    />
                  </div>

                  {/* SIZE SELECT */}
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">
                      Size
                    </label>
                    <select
                      value={item.size?.size}
                      onChange={(e) => {
                        const selectedSize = item.sizes.find(
                          (sz) => sz.size === e.target.value
                        );
                        updateProduct(index, { size: selectedSize });
                      }}
                      className="bg-black border border-gray-600 rounded px-2 py-1 w-full text-sm text-white"
                    >
                      {item.sizes.map((sz) => (
                        <option key={sz.size} value={sz.size}>
                          {sz.size}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* TOTAL */}
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">
                      Total
                    </label>
                    <span className="font-bold text-white text-sm block pt-1">
                      {mainPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-4">No products selected</p>
      )}
    </>
  );
}
