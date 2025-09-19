// ===== IMPROVED CATEGORY MODAL =====
// app/creator/categories/_components/CategoryModal.js
"use client";
import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import useCommonState from "@/app/src/hooks/useCommonState";
import { createCategory, updateCategory } from "@/app/actions/category.action";

export default function CategoryModal() {
  const { common, setCommon } = useCommonState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Pre-populate form when editing
  useEffect(() => {
    if (common?.editingCategory) {
      setFormData({
        name: common.editingCategory.name || "",
        description: common.editingCategory.description || "",
        status: common.editingCategory.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        status: "Active",
      });
    }
    setErrors({});
  }, [common?.editingCategory, common?.categoryModal]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      let result;
      if (common?.editingCategory) {
        result = await updateCategory(
          common.editingCategory._id || common.editingCategory.id,
          formData
        );
      } else {
        result = await createCategory(formData);
      }

      if (result.error) {
        // Handle error (you can use toast notification here)
        alert(result.message);
      } else {
        // Success - close modal
        handleClose();
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", description: "", status: "Active" });
    setErrors({});
    setCommon({
      ...common,
      categoryModal: false,
      editingCategory: null,
    });
  };

  if (!common?.categoryModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-black rounded-lg border border-gray-700 w-full max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {common?.editingCategory ? "Edit Category" : "Create Category"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter category name"
              className={`w-full px-3 py-2 bg-black border rounded-lg focus:outline-none transition-colors text-white placeholder-gray-400 ${
                errors.name
                  ? "border-red-500 focus:border-red-400"
                  : "border-gray-600 focus:border-gray-500"
              }`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter category description"
              rows={3}
              className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500 transition-colors text-white placeholder-gray-400 resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-gray-500 transition-colors text-white"
              disabled={isLoading}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !formData.name.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Save className="w-4 h-4" />
            {isLoading
              ? "Saving..."
              : common?.editingCategory
              ? "Update"
              : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
