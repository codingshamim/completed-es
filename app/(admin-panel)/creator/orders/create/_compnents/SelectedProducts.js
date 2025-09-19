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
            <div key={index} className="px-6 py-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <ReusableImage
                    src={item?.thumbnail}
                    width={48}
                    height={48}
                    alt={item?.title}
                    className="w-12 h-12  rounded border border-gray-600"
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
                    {" "}
                    {mainPrice(item.price)}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
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
                      <option key={size} defaultValue={size}>
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
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-4">No products selected</p>
      )}
    </>
  );
}
