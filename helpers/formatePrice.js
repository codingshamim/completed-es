export default function formatePrice(
  originalPrice,
  discountPercentage,
  quantity = 1
) {
  const discountedPrice =
    originalPrice * (1 - discountPercentage / 100) * quantity;
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  }).format(discountedPrice);
}
