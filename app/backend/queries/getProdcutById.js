import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { ProductModel } from "../models/ProductModel";

export default async function getProdcutById(id) {
  await dbConnect();
  try {
    const getProduct = await ProductModel.findById(id).select([
      "thumbnail",
      "title",
      "price",
      "discount",
      "sizes",
    ]);
    if (getProduct) {
      return {
        ok: true,
        product: formateMongo(getProduct),
      };
    } else {
      throw new Error("No product found!");
    }
  } catch (err) {
    throw new Error(err);
  }
}
