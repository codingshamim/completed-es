"use client";

import ReusableImage from "@/app/_components/ReusableImage";
import useCommonState from "@/app/src/hooks/useCommonState";
import mainPrice from "@/helpers/mainPrice";

export default function SelectedProducts() {
  const { common, setCommon } = useCommonState();
  return (
    <>
      {common?.selectedProducts.length > 0 ? (
        <div className="divide-y divide-gray-700">
          {common?.selectedProducts.map((item, index) => (
            <div key={index} className="px-3 sm:px-6 py-4">
              {/* Desktop Layout */}
              <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <ReusableImage
                    src={item?.thumbnail}
                    width={48}
                    height={48}
                    alt={item?.title}
                    className="w-12 h-12 rounded border border-gray-600"
                  />
                </div>
                <div className="col-span-4">
                  <h4 className="font-medium text-white text-sm">
                    {item?.title || "Untitled"}
                  </h4>
                  <p className="text-gray-400 text-xs">SKU: {item?.sku}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-white font-medium">
                    {mainPrice(item.price)}
                  </span>
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min="1"
                    onChange={(e) => {
                      setCommon({
                        ...common,
                        selectedProducts: common.selectedProducts.map(
                          (prod, i) =>
                            i === index
                              ? {
                                  ...prod,
                                  quantity: parseInt(e.target.value) || 1,
                                }
                              : prod
                        ),
                      });
                    }}
                    value={item.quantity}
                    className="bg-black border border-gray-600 rounded px-2 py-1 w-16 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="col-span-1">
                  <select
                    value={item.size}
                    onChange={(e) => {
                      setCommon({
                        ...common,
                        selectedProducts: common.selectedProducts.map(
                          (prod, i) =>
                            i === index
                              ? { ...prod, size: e.target.value }
                              : prod
                        ),
                      });
                    }}
                    className="bg-black border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {item.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <span className="font-bold text-white">
                    {mainPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>

              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden space-y-3">
                <div className="flex gap-3">
                  <ReusableImage
                    src={item?.thumbnail}
                    width={64}
                    height={64}
                    alt={item?.title}
                    className="w-16 h-16 flex-shrink-0 rounded border border-gray-600"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm truncate">
                      {item?.title || "Untitled"}
                    </h4>
                    <p className="text-gray-400 text-xs">SKU: {item?.sku}</p>
                    <p className="text-white font-medium text-sm mt-1">
                      {mainPrice(item.price)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      onChange={(e) => {
                        setCommon({
                          ...common,
                          selectedProducts: common.selectedProducts.map(
                            (prod, i) =>
                              i === index
                                ? {
                                    ...prod,
                                    quantity: parseInt(e.target.value) || 1,
                                  }
                                : prod
                          ),
                        });
                      }}
                      value={item.quantity}
                      className="bg-black border border-gray-600 rounded px-2 py-1 w-full text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">
                      Size
                    </label>
                    <select
                      value={item.size}
                      onChange={(e) => {
                        setCommon({
                          ...common,
                          selectedProducts: common.selectedProducts.map(
                            (prod, i) =>
                              i === index
                                ? { ...prod, size: e.target.value }
                                : prod
                          ),
                        });
                      }}
                      className="bg-black border border-gray-600 rounded px-2 py-1 w-full text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      {item.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
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
