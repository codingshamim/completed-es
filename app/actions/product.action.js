"use server";

import { auth } from "@/auth";
import { dbConnect } from "../backend/connection/dbConnect";
import { UserModel } from "../backend/models/UserModel";
import { ProductModel } from "../backend/models/ProductModel";
import { revalidatePath } from "next/cache";

import formateMongo from "@/helpers/formateMongo";

const checkAdmin = async () => {
  try {
    await dbConnect();
    const loggedUser = await auth();

    if (!loggedUser?.user?.id) {
      return false;
    }

    const user = await UserModel.findById(loggedUser.user.id).select("role");
    return user?.role === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

const validateProductData = (data) => {
  const errors = [];

  if (!data.title?.trim()) {
    errors.push("Product title is required");
  }

  if (!data.description?.trim()) {
    errors.push("Product description is required");
  }

  if (!data.price || data.price <= 0) {
    errors.push("Valid product price is required");
  }

  if (!data.stock || data.stock < 0) {
    errors.push("Valid stock quantity is required");
  }

  if (!data.thumbnail?.trim()) {
    errors.push("Product thumbnail is required");
  }

  if (data.discount && (data.discount < 0 || data.discount > 100)) {
    errors.push("Discount must be between 0 and 100");
  }

  return errors;
};

const deleteProductById = async (productId) => {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return {
        error: true,
        message: "Unauthorized access",
      };
    }

    await dbConnect();
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return {
        error: true,
        message: "Product not found",
      };
    }

    revalidatePath("/");
    return {
      ok: true,
      message: "Product deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting product:", err);
    return {
      error: true,
      message: "Failed to delete product",
    };
  }
};

const createProduct = async (formData) => {
  console.log(formData?.sizes);
  try {
    // 1️⃣ Authentication
    const loggedUser = await auth();
    if (!loggedUser?.user?.id) {
      return { error: true, message: "Authentication required" };
    }

    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return { error: true, message: "Unauthorized access" };
    }

    // 2️⃣ Validate data
    const validationErrors = validateProductData(formData);
    if (validationErrors.length > 0) {
      return { error: true, message: validationErrors.join(", ") };
    }

    await dbConnect();

    // 3️⃣ Generate unique slug
    let slug = formData.slug?.trim() || generateSlug(formData.title);
    const existingProduct = await ProductModel.findOne({ slug });
    if (existingProduct) slug = `${slug}-${Date.now()}`;

    // 4️⃣ Prepare sizes array without overwriting existing schema
    const sizes = formData?.sizes || [];

    // 5️⃣ Calculate total stock
    const totalStock = sizes.reduce((acc, s) => acc + s.stock, 0);

    // 6️⃣ Product data
    const productData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      discount: Number(formData.discount) || 0,
      stock: totalStock,
      thumbnail: formData.thumbnail.trim(),
      gallery: formData.gallery?.filter((url) => url.trim()) || [],
      category: formData.category || [],
      sizes: sizes,
      ability: formData.ability?.filter((a) => a.trim()) || [],
      status: formData.status || "active",
      slug: slug,
      user: loggedUser.user.id,
    };

    // 7️⃣ Create product
    const newProduct = await ProductModel.create(productData);

    // 8️⃣ Revalidate paths
    revalidatePath("/");
    revalidatePath("/products");

    return {
      ok: true,
      message: "Product created successfully",
      productId: formateMongo(newProduct)?._id,
      slug: formateMongo(newProduct)?.slug,
    };
  } catch (err) {
    console.error("Error creating product:", err);

    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return {
        error: true,
        message: `${field} already exists. Please use a different value.`,
      };
    }

    if (err.name === "ValidationError") {
      const validationErrors = Object.values(err.errors).map((e) => e.message);
      return { error: true, message: validationErrors.join(", ") };
    }

    return {
      error: true,
      message: "Failed to create product. Please try again.",
    };
  }
};

/**
 * Update a product by slug
 * @param {string} slug - Product slug to identify the product
 * @param {Object} updateData - Data to update the product with
 * @returns {Promise<{ success: boolean, product?: any, message?: string }>}
 */
const updateProduct = async (slug, updateData) => {
  try {
    await dbConnect();

    if (!slug) {
      return {
        success: false,
        message: "Product slug is required",
      };
    }

    // Find the product first to check if it exists
    const existingProduct = await ProductModel.findOne({ slug }).lean();

    if (!existingProduct) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    // Clean and validate update data
    const cleanedData = {
      ...updateData,
      updatedAt: new Date(),
    };

    // Remove empty arrays and undefined values
    Object.keys(cleanedData).forEach((key) => {
      if (cleanedData[key] === undefined || cleanedData[key] === null) {
        delete cleanedData[key];
      }
      // Clean empty strings from arrays
      if (Array.isArray(cleanedData[key])) {
        cleanedData[key] = cleanedData[key].filter((item) =>
          typeof item === "string" ? item.trim() !== "" : item
        );
      }
    });

    // If slug is being updated, check if new slug already exists
    if (cleanedData.slug && cleanedData.slug !== slug) {
      const slugExists = await ProductModel.findOne({
        slug: cleanedData.slug,
        _id: { $ne: existingProduct._id },
      });

      if (slugExists) {
        return {
          success: false,
          message: "A product with this slug already exists",
        };
      }
    }

    // Update the product
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { slug },
      cleanedData,
      {
        new: true, // Return updated document
        runValidators: true, // Run mongoose validators
      }
    ).lean();

    if (!updatedProduct) {
      return {
        success: false,
        message: "Failed to update product",
      };
    }

    return {
      success: true,
      product: formateMongo([updatedProduct])[0],
      message: "Product updated successfully",
    };
  } catch (error) {
    console.error("Error updating product:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return {
        success: false,
        message: `Validation error: ${validationErrors.join(", ")}`,
      };
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return {
        success: false,
        message: `A product with this ${field} already exists`,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred while updating the product",
    };
  }
};

const updateProductAction = async (slug, productData) => {
  try {
    // Validate required fields
    const requiredFields = ["title", "description", "price", "stock"];
    const missingFields = requiredFields.filter(
      (field) =>
        !productData[field] || productData[field].toString().trim() === ""
    );

    if (missingFields.length > 0) {
      return {
        error: true,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      };
    }

    // Validate data types and ranges
    if (
      isNaN(parseFloat(productData.price)) ||
      parseFloat(productData.price) <= 0
    ) {
      return {
        error: true,
        message: "Price must be a valid positive number",
      };
    }

    if (isNaN(parseInt(productData.stock)) || parseInt(productData.stock) < 0) {
      return {
        error: true,
        message: "Stock must be a valid non-negative number",
      };
    }

    if (
      productData.discount &&
      (isNaN(parseFloat(productData.discount)) ||
        parseFloat(productData.discount) < 0 ||
        parseFloat(productData.discount) > 100)
    ) {
      return {
        error: true,
        message: "Discount must be between 0 and 100",
      };
    }

    // Clean and prepare data
    const cleanedData = {
      title: productData.title.trim(),
      description: productData.description.trim(),
      price: parseFloat(productData.price),
      discount: parseFloat(productData.discount) || 0,
      stock: parseInt(productData.stock),
      slug: productData.slug?.trim() || slug,
      thumbnail: productData.thumbnail?.trim() || "",
      category: Array.isArray(productData.category) ? productData.category : [],
      sizes: Array.isArray(productData.sizes) ? productData.sizes : [],
      ability: Array.isArray(productData.ability)
        ? productData.ability.filter((ability) => ability.trim())
        : [], // Fix: Remove .title
      gallery: Array.isArray(productData.gallery)
        ? productData.gallery.filter((url) => url.trim())
        : [],
      status: productData.status || "active",
    };

    const result = await updateProduct(slug, cleanedData);

    if (!result.success) {
      return {
        error: true,
        message: result.message,
      };
    }

    return {
      error: false,
      message: result.message,
      product: result.product,
      slug: result.product.slug, // Return new slug in case it was updated
    };
  } catch (error) {
    console.error("Update product action error:", error);
    return {
      error: true,
      message: "An unexpected error occurred while updating the product",
    };
  }
};

export {
  deleteProductById,
  checkAdmin,
  createProduct,
  updateProduct,
  updateProductAction,
};
