import { useContext } from "react";
import { CommonContext } from "../context";

export default function useCommonState() {
  const { common, setCommon, checkout, setCheckout, discountPercentage, setDiscountPercentage } = useContext(CommonContext);
  return { common, setCommon, checkout, setCheckout, discountPercentage, setDiscountPercentage };
}
