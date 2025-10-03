import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { ProductModel } from "../models/ProductModel";

export default async function getCategoryWiseProduct(
  category,
  ignoreProductId
) {
  try {
    await dbConnect();
    const getProduct = await ProductModel.find({ category: category })
      .select({
        thumbnail: 1,
        price: 1,
        discount: 1,
        _id: 1,
        slug: 1,
      })
      .where("_id")
      .ne(ignoreProductId)
      .limit(10);
    const replace = formateMongo(getProduct);
    return replace;
  } catch (err) {
    throw new Error("Something went wrong while getting category wise product");
  }
}
