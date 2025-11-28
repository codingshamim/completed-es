import ProductOrder from "./ProductOrder";

export default function ProductContent({
  originalPrice,
  title,
  description,
  discount,
  ability = [],
  sizes = [],
  stock,
  id,
}) {
  // sizes now has objects like: { size: "M", stock: 10, measurements: { chest, length, sleeve } }
  const sizeMeasurements = sizes.length
    ? sizes.map((s) => ({
        size: s.size,
        stock: s.stock,
        chest: s.measurements?.chest ?? "",
        length: s.measurements?.length ?? "",
        sleeve: s.measurements?.sleeve ?? "",
      }))
    : [];

  return (
    <div className="hero-content w-full md:w-[55%]">
      {discount > 0 && (
        <button className="new-btn !text-black">{discount} % Discount</button>
      )}
      <h1 className="mt-2 mb-2 text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-300 mb-2">{description}</p>

      <ProductOrder
        originalPrice={originalPrice}
        stock={stock}
        sizes={sizes}
        discount={discount}
        productId={id}
      />

      {ability.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Fabric</h2>
          <ul className="list-disc text-sm text-gray-300 ml-6">
            {ability.map((abil, index) => (
              <li key={index}>{abil}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Size Chart Section */}
      {sizeMeasurements.length > 0 && (
        <div className="mt-6 mb-6">
          <h2 className="text-lg font-bold mb-3">
            Size chart - In inches (Expected Deviation &lt; 3%)
          </h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white border border-gray-800">
                    Size
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white border border-gray-800">
                    Chest (round)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white border border-gray-800">
                    Length
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white border border-gray-800">
                    Sleeve
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white border border-gray-800">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeMeasurements.map((s, index) => (
                  <tr
                    key={index}
                    className="bg-black border-b border-gray-800 hover:bg-gray-900 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-white border border-gray-800">
                      {s.size}
                    </td>
                    <td className="px-4 py-3 text-sm text-white border border-gray-800">
                      {s.chest}
                    </td>
                    <td className="px-4 py-3 text-sm text-white border border-gray-800">
                      {s.length}
                    </td>
                    <td className="px-4 py-3 text-sm text-white border border-gray-800">
                      {s.sleeve}
                    </td>
                    <td className="px-4 py-3 text-sm text-white border border-gray-800">
                      {s.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Table */}
          <div className="md:hidden overflow-x-auto">
            <table className="w-full border-collapse min-w-[400px]">
              <thead>
                <tr className="bg-black">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-white border border-gray-800">
                    Size
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-white border border-gray-800">
                    Chest
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-white border border-gray-800">
                    Length
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-white border border-gray-800">
                    Sleeve
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-white border border-gray-800">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeMeasurements.map((s, index) => (
                  <tr key={index} className="bg-black border-b border-gray-800">
                    <td className="px-3 py-2 text-xs font-medium text-white border border-gray-800">
                      {s.size}
                    </td>
                    <td className="px-3 py-2 text-xs text-white border border-gray-800">
                      {s.chest}
                    </td>
                    <td className="px-3 py-2 text-xs text-white border border-gray-800">
                      {s.length}
                    </td>
                    <td className="px-3 py-2 text-xs text-white border border-gray-800">
                      {s.sleeve}
                    </td>
                    <td className="px-3 py-2 text-xs text-white border border-gray-800">
                      {s.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {stock <= 10 && stock > 0 && (
        <div className="mb-4">
          <p className="text-yellow-400 inline-block text-sm font-medium bg-yellow-900/20 px-3 py-2 rounded-lg">
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shield-alert-icon lucide-shield-alert"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
              Only {stock} {stock > 1 ? "Items" : "Item"} Available
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
