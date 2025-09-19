import minusDiscount from "./minusDiscount";

export default function totalPrice(items) {
  const total = items.reduce((sum, item) => {
    const finalPrice = minusDiscount(item.price, item.discount);
    return sum + finalPrice * (item.quantity || 1); // ✅ multiply by quantity
  }, 0);

  return total;
}
