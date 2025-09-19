import { cartModel } from "../models/CartModel";

export default async function updateCartQuery(updateId, updatedData) {
  try {
    const response = await cartModel.updateOne({ _id: updateId }, updatedData);
    if (response) {
      return {
        ok: true,
        message: "Successfully updated Cart!",
      };
    }
  } catch (err) {
    throw new Error("Something went wrong ");
  }
}
