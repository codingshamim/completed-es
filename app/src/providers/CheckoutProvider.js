"use client";
import { useState } from "react";
import { CheckoutContext } from "../context";

export default function CheckoutProvider({ children }) {
  // products: [

  // ],
  // // subtotal: 450,
  // // total: "",
  const [checkout, setCheckout] = useState([]);
  return (
    <CheckoutContext.Provider value={{ checkout, setCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
}
