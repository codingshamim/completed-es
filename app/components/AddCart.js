"use client";

import { useEffect, useState } from "react";
import { addTocartAction, updateCart } from "../backend/actions";
import useCommonState from "../src/hooks/useCommonState";
import SecondaryLoadingBtn from "./SecondaryLoadingBtn";
import { useRouter } from "next/navigation";

export default function AddCart({ quantity, productId, size }) {
  const { common, setCommon } = useCommonState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [localCarts, setLocalCarts] = useState([]);
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("carts")) || []; // Ensure it initializes as an array
    setLocalCarts(cartItems);
  }, []);
  const handleAddToCart = async () => {
    try {
      setCommon({
        ...common,
        toast: false,
        toastMessage: "",
      });
      setLoading(true);
      const response = await addTocartAction({ quantity, productId, size });

      if (response.ok) {
        setCommon({
          ...common,
          toast: true,
          buyModal: false,
          toastMessage: response?.message,
          toastSuccess: true,
          quantity: 1,
        });
      } else if (response?.message === "User not authenticated.") {
        setCommon({
          ...common,
          toastSuccess: false,
          toast: true,
          buyModal: false,
          quantity: 1,
          toastMessage: response?.message,
        });
        router.push("/login");
      } else {
        const newCartItem = { quantity, productId, size };
        const updatedCarts = [...localCarts, newCartItem]; // Add the new item to the existing cart list
        setLocalCarts(updatedCarts); // Update the state with the new cart list
        localStorage.setItem("carts", JSON.stringify(updatedCarts));
        setCommon({
          ...common,
          toastSuccess: false,
          toast: true,
          buyModal: false,
          quantity: 1,
          toastMessage: response?.message,
        });
      }
    } catch (err) {
      setCommon({
        ...common,
        toast: true,
        toastSuccess: false,
        toastMessage: "Something went wrong while adding product in Cart !",
      });
    } finally {
      setLoading(false);
    }
  };
  let handler;
  if (common?.mode === "update") {
    handler = async () => {
      try {
        setLoading(true);
        const result = await updateCart(common?.cartId, { quantity, size });
        if (result.ok) {
          setCommon({
            ...common,
            toast: true,
            buyModal: false,
            productId: "",
            mode: "",
            quantity: 1,
            toastMessage: result?.message,
          });
        }
      } catch (err) {
        throw new Error(err.message);
      } finally {
        setLoading(false);
      }
    };
  } else {
    handler = handleAddToCart;
  }

  return (
    <SecondaryLoadingBtn
      loading={loading}
      onClick={handler}
      className="py-2   justify-center flex items-center  gap-1 px-4 font-medium active:scale-[98%] transition-all duration-300 rounded-sm new-variable-btn hover:border-transparent nav-border text-white text-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shopping-cart"
      >
        <circle cx={8} cy={21} r={1} />
        <circle cx={19} cy={21} r={1} />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      <span className="bangla-font">
        {common?.mode === "update" ? "আপডেট করুন" : "কার্টে যোগ করুন"}
      </span>
    </SecondaryLoadingBtn>
  );
}
