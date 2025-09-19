"use server"

import getDiscount from "../queries/getDiscount";

const getDiscountAction = async (couponCode) => {
  const coupon = await getDiscount(couponCode);
  if (!coupon) throw new Error("Coupon not found");
  return coupon.discount;
};

export { getDiscountAction };