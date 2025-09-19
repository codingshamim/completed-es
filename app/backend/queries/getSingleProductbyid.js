import formateMongo from "@/helpers/formateMongo";
import { ProductModel } from "../models/ProductModel";
import { dbConnect } from "../connection/dbConnect";

export default async function getSingleProductbyid(id) {
  await dbConnect();
  try {
    const getProduct = await ProductModel.findById(id).select([
      "thumbnail",
      "title",
      "price",
      "discount",
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
