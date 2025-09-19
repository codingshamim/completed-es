"use server";
import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { ProductModel } from "../models/ProductModel";

/**
 * Get paginated and filtered list of products
 * @param {string} query - Search query to filter products
 * @param {number} limit - Number of products per page (default: 10)
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<{ totalItems: number, products: any[], currentPage: number, totalPages: number, error?: boolean } | { error: boolean, message: string, products: any[], totalItems: number, currentPage: number, totalPages: number }>}
 */
export default async function getProducts(query = "", limit = 10, page = 1) {
  try {
    await dbConnect();

    // Ensure limit and page are valid numbers with reasonable bounds
    const validLimit = Math.max(1, Math.min(parseInt(limit) || 10, 100)); // Max 100 per page
    const validPage = Math.max(1, parseInt(page) || 1);

    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { sku: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const skip = validLimit * (validPage - 1);

    const [totalItems, products] = await Promise.all([
      ProductModel.countDocuments(filter),
      ProductModel.find(filter)
        .sort({ createdAt: -1 }) // Add consistent sorting
        .limit(validLimit)
        .skip(skip)
        .lean(),
    ]);

    const totalPages = Math.ceil(totalItems / validLimit);

    return {
      totalItems,
      products: formateMongo(products) || [], // Ensure it's always an array
      currentPage: validPage,
      totalPages,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1,
      error: false, // Add explicit success indicator
    };
  } catch (err) {
    console.error("Error fetching products:", err);

    // IMPORTANT: Return the same structure with empty/default values
    return {
      error: true,
      message: "Failed to fetch products. Please try again later.",
      products: [], // Always provide empty array
      totalItems: 0,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }
}
