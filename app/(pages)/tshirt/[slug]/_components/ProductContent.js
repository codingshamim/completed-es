import ProductOrder from "./ProductOrder";

export default function ProductContent({
  originalPrice,
  title,
  description,
  discount,
  ability,
  sizes,
  stock,
  id,
}) {
  return (
    <div className="hero-content w-full md:w-[60%]">
      {discount > 0 && (
        <button className="new-btn !text-black ">{discount} % Discount</button>
      )}
      <h1 className="mt-2 mb-2 text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-300 mb-2">{description}</p>

      {ability.length > 0 && ability && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Fabric</h2>
          <ul className="list-disc text-sm text-gray-300 ml-6">
            {ability.map((abil, index) => (
              <li key={index}>{abil}</li>
            ))}
          </ul>
        </div>
      )}
      {stock <= 10 && stock > 0 && (
        <div className="mb-4 mt-4">
          <p className="text-yellow-400  items-center  inline-block  text-sm font-medium bg-yellow-900/20 px-3 py-2 rounded-lg ">
            <span className="flex items-center gap-2">
              {" "}
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
      <ProductOrder
        originalPrice={originalPrice}
        stock={stock}
        sizes={sizes}
        discount={discount}
        productId={id}
      />
    </div>
  );
}
