export default function mainPrice(originalPrice) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  }).format(originalPrice);
}
