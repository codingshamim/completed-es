"use client";
import { useState } from "react";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { deleteCategory } from "@/app/actions/category.action";

export default function DeleteButton({ category }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteCategory(category._id || category.id);
      if (result.error) {
        // Handle error (you can use toast or alert)
        alert(result.message);
      }
    } catch (error) {
      alert("Failed to delete category");
    } finally {
      setIsLoading(false);
      setIsConfirmOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
        title="Delete category"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-black rounded-lg border border-gray-700 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-bold text-white">
                  Delete Category
                </h2>
              </div>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-gray-300 mb-4">
                Are you sure you want to delete the category{" "}
                <span className="font-semibold text-white">
                  {category.name}
                </span>
                ?
              </p>
              <p className="text-gray-400 text-sm">
                This action cannot be undone. All products in this category will
                need to be reassigned.
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
