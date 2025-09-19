"use server";
import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { ProductModel } from "../models/ProductModel";

export async function getAllProducts(query, filter, page = 1, limit = 12) {
  try {
    await dbConnect();

    let conditions = {};

    if (query) {
      const regex = new RegExp(query, "i");
      conditions.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    if (filter?.category?.length) {
      conditions.category = { $in: filter.category };
    }

    const skip = (page - 1) * limit;

    const allProducts = await ProductModel.find(conditions)
      .select({
        title: 1,
        price: 1,
        discount: 1,
        thumbnail: 1,
        description: 1,
        sizes: 1,
        sku: 1,
        _id: 1,
        slug: 1,
        stock: 1,
        category: 1,
      })
      .skip(skip)
      .limit(limit);

    return formateMongo(allProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    throw new Error("Something went wrong while fetching products");
  }
}
