export default function minusDiscount(price, discount) {
  if (!price || !discount) return price; // if discount missing, return original price
  const discountedPrice = price - (price * discount) / 100;
  return Math.round(discountedPrice); // round to nearest integer
}
