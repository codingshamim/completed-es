"use server"
// app/backend/queries/getProductBySlug.js
import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { ProductModel } from "../models/ProductModel";

/**
 * Get a single product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<{ product?: any, error?: boolean, message?: string }>}
 */
export default async function getProductBySlug(slug) {
  try {
    await dbConnect();

    if (!slug) {
      return {
        error: true,
        message: "Product slug is required",
      };
    }

    const product = await ProductModel.findOne({ slug }).lean();

    if (!product) {
      return {
        error: true,
        message: "Product not found",
      };
    }

    return {
      product: formateMongo([product])[0],
      error: false,
    };

  } catch (error) {
    console.error("Error fetching product:", error);
    
    return {
      error: true,
      message: "Failed to fetch product. Please try again later.",
    };
  }
}