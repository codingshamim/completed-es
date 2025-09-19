"use client";
import useCommonState from "@/app/src/hooks/useCommonState";
import { Plus } from "lucide-react";

export default function CreateButton() {
  const { common, setCommon } = useCommonState();
  return (
    <button
      onClick={() =>
        setCommon({
          ...common,
          categoryModal: true,
          editingCategory: null,
        })
      }
      className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium whitespace-nowrap"
    >
      <Plus className="w-5 h-5" />
      Create Category
    </button>
  );
}
