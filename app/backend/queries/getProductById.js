import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { ProductModel } from "../models/ProductModel";

export default async function getProductBySlug(productSlug) {
  try {
    await dbConnect();

    const response = await ProductModel.find({ slug: productSlug });

    if (response && response.length > 0) {
      const convert = formateMongo(response[0]);
      return convert;
    } else {
      return {
        ok: false,
        message: "No Product Found!",
      };
    }
  } catch (err) {
    throw new Error(err);
  }
}
