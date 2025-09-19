/**
 * Calculate total amount from nested orders array
 * @param {Array<{ orders: { price: number, quantity: number }[] }>} data
 * @returns {number} total amount
 */
export function calculateOrdersTotal(data = []) {
  return data.reduce((grandTotal, entry) => {
    const orderTotal = (entry.orders || []).reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + price * qty;
    }, 0);
    return grandTotal + orderTotal;
  }, 0);
}
