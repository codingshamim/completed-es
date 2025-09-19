// app/actions/category.action.js
"use server";

import { checkAdmin } from "./product.action";

const { revalidatePath } = require("next/cache");
const { dbConnect } = require("../backend/connection/dbConnect");
const { categoryModel } = require("../backend/models/cateogryModel");

const createCategory = async (data) => {
  const category = {
    name: data?.name?.trim() || "",
    description: data?.description?.trim() || "",
    status: data?.status?.trim() || "Active",
  };

  if (!category.name) {
    return {
      error: true,
      message: "Category name is required",
    };
  }

  try {
    const isAdmin = await checkAdmin();
    if (isAdmin) {
      await dbConnect();
      await categoryModel.create(category);
      revalidatePath("/creator/categories");
      return {
        error: false,
        message: "Successfully created new category",
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

const updateCategory = async (id, data) => {
  const category = {
    name: data?.name?.trim() || "",
    description: data?.description?.trim() || "",
    status: data?.status?.trim() || "Active",
  };

  if (!category.name) {
    return {
      error: true,
      message: "Category name is required",
    };
  }

  try {
    const isAdmin = await checkAdmin();
    if (isAdmin) {
      await dbConnect();
      await categoryModel.findByIdAndUpdate(id, category);
      revalidatePath("/creator/categories");
      return {
        error: false,
        message: "Successfully updated category",
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

const deleteCategory = async (id) => {
  try {
    const isAdmin = await checkAdmin();
    if (isAdmin) {
      await dbConnect();
      await categoryModel.findByIdAndDelete(id);
      revalidatePath("/creator/categories");
      return {
        error: false,
        message: "Successfully deleted category",
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

const getCategories = async (query) => {
  try {
    await dbConnect();
    const isAdmin = await checkAdmin();
    if (isAdmin) {
      let filter = {};
      if (query) {
        const regex = new RegExp(query, "i"); // case-insensitive
        filter = {
          $or: [
            { name: regex }, // match category name
            { description: regex }, // match description too
          ],
        };
      }

      const categories = await categoryModel
        .find(filter)
        .sort({ createdAt: -1 });

      return {
        error: false,
        data: JSON.parse(JSON.stringify(categories)),
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err.message,
      data: [],
    };
  }
};

export { createCategory, updateCategory, deleteCategory, getCategories };
