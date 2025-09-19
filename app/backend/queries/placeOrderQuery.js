import { auth } from "@/auth";
import { dbConnect } from "../connection/dbConnect";
import { orderModel } from "../models/orderModel";
import { cartModel } from "../models/CartModel";
import { ProductModel } from "../models/ProductModel";

import generateNumber from "@/helpers/generateNumber";

export default async function placeOrderQuery(params, cartIds, mode) {
  try {
    // Connect to the database
    await dbConnect();

    // Authenticate the user
    const loggedAuth = await auth();
    if (!loggedAuth?.user?.id) {
      throw new Error("User not authenticated.");
    }

    // Process items to include price and update stock
    const itemsWithPrice = await Promise.all(
      params.items.map(async (item) => {
        const product = await ProductModel.findById(item.product).select([
          "price",
          "discount",
          "stock",
        ]);
        if (!product) {
          throw new Error(`Product with ID ${item.product} not found.`);
        }
        if (product.stock <= 0) {
          throw new Error(`Product with ID ${item.product} is out of stock.`);
        }

        const discountedPrice = product.price * (1 - product.discount / 100);

        // Decrement stock by 1
        product.stock -= item?.quantity;
        await product.save();

        return {
          ...item,
          price: discountedPrice, // Add the price to the item
        };
      })
    );

    // Update the params object with the processed items
    const updatedObject = {
      ...params,
      items: itemsWithPrice,
      user: loggedAuth?.user?.id,
      transactionId: generateNumber(),
    };


    // Create the order
    const response = await orderModel.create(updatedObject);

    // If the order is successfully created, delete cart items
    if (mode === "indirect") {
      const deleteQuery = await cartModel.deleteMany({ _id: { $in: cartIds } });
      if (deleteQuery.deletedCount === cartIds.length) {
        return {
          ok: true,
          message: "Successfully placed order!",
          transactionId: generateNumber(),
        };
      }
    } else {
      return {
        ok: true,
        message: "Successfully placed order!",
        transactionId: generateNumber(),
      };
    }
  } catch (err) {
    console.error("Error in placeOrderQuery:", err.message || err);
    throw new Error(
      err.message || "An error occurred while placing the order."
    );
  }
}
