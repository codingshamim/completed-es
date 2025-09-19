"use client";
import { Edit } from "lucide-react";
import useCommonState from "@/app/src/hooks/useCommonState";

export default function EditButton({ category }) {
  const { common, setCommon } = useCommonState();

  const handleEditCategory = () => {
    setCommon({
      ...common,
      categoryModal: true,
      editingCategory: category,
    });
  };

  return (
    <button
      onClick={handleEditCategory}
      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
      title="Edit category"
    >
      <Edit className="w-4 h-4" />
    </button>
  );
}
