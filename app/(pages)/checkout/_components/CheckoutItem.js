"use client";
import { useEffect, useState } from "react";
import DeleteCartButton from "../../cart/_components/DeleteCartButton";
import { getCheckoutItemById } from "@/app/actions/checkout.action";
import Image from "next/image";
import CheckoutLoader from "./CheckoutLoader";
import mainPrice from "@/helpers/mainPrice";

export default function CheckoutItem({ mode = "", check }) {
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);
  const discountPrice = (checkoutItem?.price / 100) * checkoutItem?.discount;
  const price = checkoutItem?.price - discountPrice;
  const originalPrice = mainPrice(price);

  
  useEffect(() => {
    let ignore = false;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const productById = await getCheckoutItemById(check);

        if (productById?.error) {
          setError(productById?.message);
          setLoading(false);
          return;
        }

        if (!ignore && productById) {
          setCheckoutItem(productById);
          setLoading(false);
        }
      } catch (e) {
        if (!ignore) {
          setError(e.message);
          setLoading(false);
        }
      }
    };

    if (check) {
      fetchProduct();
    }

    return () => {
      ignore = true;
    };
  }, [check]);
 
  // Show error state
  if (error) {
    return (
      <div className="grid mt-2 nav-border grid-cols-12 gap-4 shadow-lg p-2">
        <div className="col-span-12 flex items-center justify-center text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading || !checkoutItem) {
    return <CheckoutLoader />;
  }

  return (
    <div className="grid mt-2 nav-border grid-cols-12 gap-4 shadow-lg p-2">
      {/* Only render Image if thumbnail exists and is not empty */}
      {checkoutItem?.thumbnail ? (
        <Image
          width={80}
          height={80}
          className="col-span-12 md:col-span-1 w-full h-full object-cover"
          src={checkoutItem.thumbnail}
          alt={checkoutItem?.title || "Product image"}
        />
      ) : (
        <div className="col-span-12 md:col-span-1 w-full h-20 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      )}

      <div className="col-span-12 md:col-span-3 flex items-center">
        <h1>{checkoutItem?.title || "No title"}</h1>
      </div>

      <div className="col-span-12 md:col-span-2 flex md:text-center items-center">
        <span className="md:hidden">Price :</span>
        <p className="text-gray-300 text-xs ml-2">
           {originalPrice || "0"}
        </p>
      </div>

      <div className="col-span-12 md:col-span-1 md:text-center flex items-center">
        <span className="md:hidden">Quantity :</span>
        <p className="text-gray-300 text-xs ml-2">
          {check?.quantity || "1"}
        </p>
      </div>

      <div className="col-span-12 md:col-span-1 md:text-center flex items-center">
        <span className="md:hidden">Size :</span>
        <p className="text-gray-300 text-xs ml-2">
          {checkoutItem?.size || "N/A"}
        </p>
      </div>

      <div className="col-span-12 md:col-span-2 flex md:text-center items-center">
        <span className="md:hidden">Total Price :</span>
        <p className="text-gray-300 ml-2 text-xs">
          
          { check?.quantity && "0"}
        </p>
      </div>

      {mode === "checkout" || (
        <div className="col-span-12 md:col-span-2 flex items-center gap-2">
          <DeleteCartButton />
        </div>
      )}
    </div>
  );
}
