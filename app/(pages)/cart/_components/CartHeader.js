export default function CartHeader({ mode }) {
  return (
    <div className="hidden md:grid text-center border border-gray-700  p-1 mt-2 mb-2 grid-cols-12 gap-4">
      <div className="col-span-1">Thumbnail</div>
      <div className="col-span-3">Info</div>
      <div className={`${mode === "checkout" ? "col-span-3" : "col-span-2"}`}>
        Price
      </div>
      <div className="col-span-1">Quantity</div>
      <div className={`${mode === "checkout" ? "col-span-2" : "col-span-1"}`}>
        Size
      </div>
      <div className={`${mode === "checkout" ? "col-span-2" : "col-span-2"}`}>
        Total Price
      </div>
      {mode === "checkout" || (
        <div
          className={`${
            mode === "checkout" ? "col-span-2" : "col-span-1"
          } text-center`}
        >
          Action
        </div>
      )}
    </div>
  );
}
