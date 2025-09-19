import { dbConnect } from "../connection/dbConnect";
import { cartModel } from "./CartModel";

export default async function delteCartItemById(cartId) {
  await dbConnect();
  try {
    const response = await cartModel.deleteOne({ _id: cartId });
    if (response) {
      return {
        ok: true,
        message: "Successfully deleted cart item",
      };
    }
  } catch (err) {
    throw new Error("Something went wrong while deleting cart item ");
  }
}
