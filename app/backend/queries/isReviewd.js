import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { orderModel } from "../models/orderModel";
import { auth } from "@/auth";

export default async function isReviewed(productId) {
  const logged = await auth();
  if (!logged?.user?.id) {
    return { ok: false };
  }

  try {
    await dbConnect();

    const successedOrders = await orderModel.find({
      delivered: "Shipped",
      user: logged.user.id,
    });

    if (!successedOrders || successedOrders.length === 0) {
      return { ok: false };
    }

    const isFound = successedOrders.some((order) => {
      const items = formateMongo(order.orders);
      return items.some((item) => {
        // Ensure productId type matches
        return String(item.productId) === String(productId);
      });
    });

    return { ok: isFound };
  } catch (err) {
    console.error("Error in isReviewed:", err);
    return { ok: false, error: err.message || "Something went wrong" };
  }
}
