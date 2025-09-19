import { auth } from "@/auth";
import { cartModel } from "./CartModel";

export default async function cartCount() {
  try {
    const loggedAuth = await auth();
    if (loggedAuth) {
      const getCarts = await cartModel.find({ userId: loggedAuth?.user?.id });
      if (getCarts.length > 0) {
        return { count: getCarts.length };
      } else {
        return { count: 0 };
      }
    } else {
      return { count: 0 };
    }
  } catch (err) {
    throw new Error("Something went wrong");
  }
}
