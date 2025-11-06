"use server";

import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../backend/connection/dbConnect";
import { ProductModel } from "../backend/models/ProductModel";
const getBuyProductById = async (productId) => {
  await dbConnect();

  try {
    const product = await ProductModel.findById(productId).select([
      "title",
      "thumbnail",
      "price",
      "discount",
      "stock",
    ]);
    return product ? formateMongo(product) : null;
  } catch (err) {
    return {
      error: true,
      message: err?.message || "An error occurred while fetching the product.",
    };
  }
};
export { getBuyProductById };
