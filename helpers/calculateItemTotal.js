export function calculateItemTotal(items = []) {
 
  return items.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return total + price * qty;
  }, 0);
}