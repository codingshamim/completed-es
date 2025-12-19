import { auth } from "@/auth";
import { cartModel } from "../models/CartModel";
import { ProductModel } from "../models/ProductModel";
import formateMongo from "@/helpers/formateMongo";

export default async function getCartById() {
  try {
    const loggedAuth = await auth();
    const userId = loggedAuth?.user?.id;
    const cartItem = await cartModel.find({ userId: userId }).populate({
      path: "productId",
      model: ProductModel,
      select: ["thumbnail", "title", "discount", "stock", "sizes"],
    });

    return formateMongo(cartItem);
  } catch (err) {
    throw new Error("Something went wrong while getting cart item with id");
  }
}
