const CheckoutLoader = ({ mode = "cart" }) => {
  return (
    <div className="grid mt-2 nav-border grid-cols-12 gap-6 shadow-lg p-2 animate-pulse">
      {/* Image Skeleton */}
      <div className="col-span-12 md:col-span-1 w-[80px] h-[80px] bg-gray-500 rounded"></div>
      
      {/* Title Skeleton */}
      <div className="col-span-12 md:col-span-3 flex items-center">
        <div className="h-4 bg-gray-500 rounded w-3/4"></div>
      </div>
      
      {/* Price Skeleton */}
      <div className="col-span-12 md:col-span-2 flex md:text-center items-center">
        <span className="md:hidden text-gray-400">Price :</span>
        <div className="h-3 bg-gray-500 rounded w-16 ml-2"></div>
      </div>
      
      {/* Quantity Skeleton */}
      <div className="col-span-12 md:col-span-1 md:text-center flex items-center">
        <span className="md:hidden text-gray-400">Quantity :</span>
        <div className="h-3 bg-gray-500 rounded w-8 ml-2"></div>
      </div>
      
      {/* Size Skeleton */}
      <div className="col-span-12 md:col-span-1 md:text-center flex items-center">
        <span className="md:hidden text-gray-400">Size :</span>
        <div className="h-3 bg-gray-500 rounded w-12 ml-2"></div>
      </div>
      
      {/* Total Price Skeleton */}
      <div className="col-span-12 md:col-span-2 flex md:text-center items-center">
        <span className="md:hidden text-gray-400">Total Price :</span>
        <div className="h-3 bg-gray-500 rounded w-20 ml-2"></div>
      </div>
      
      {/* Delete Button Skeleton - only show if not in checkout mode */}
      {mode === "checkout" || (
        <div className="col-span-12 md:col-span-2 flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-500 rounded"></div>
        </div>
      )}
    </div>
  );
};

export default CheckoutLoader