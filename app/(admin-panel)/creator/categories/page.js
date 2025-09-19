// ===== MAIN CATEGORIES PAGE =====
// app/creator/categories/page.js
import { Search } from "lucide-react";

import { getCategories } from "@/app/actions/category.action";
import CategoryModal from "./_component/CategoryModal";
import CreateButton from "./_component/CreateButton";
import DeleteButton from "./_component/DeleteButton";
import EditButton from "./_component/EditButton";
import SearchCategories from "./_component/SearchCategories";

export default async function CategoriesPage({ searchParams }) {
  const param = await searchParams;

  const result = await getCategories(param?.query || "");

  const categories = result.data || [];
  const totalCategories = categories.length;
  const activeCategories = categories.filter(
    (cat) => cat.status === "Active"
  ).length;
  const totalProducts = categories.reduce(
    (sum, cat) => sum + (cat.products || 0),
    0
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-gray-400">Manage your product categories</p>
        </div>

        {/* Error State */}
        {result.error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
            <p className="text-red-400">{result.message}</p>
          </div>
        )}

        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}

          <SearchCategories />
          {/* Create Button */}
          <CreateButton />
        </div>

        {/* Categories Table */}
        <div className="bg-black rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black border-b border-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-200">
                    Name
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-200 hidden md:table-cell">
                    Description
                  </th>

                  <th className="text-left py-4 px-6 font-semibold text-gray-200 hidden lg:table-cell">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-200 hidden lg:table-cell">
                    Created
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr
                    key={category._id}
                    className={`border-b border-gray-700 hover:bg-secondary transition-colors ${
                      index === categories.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-white">
                          {category.name}
                        </div>
                        <div className="text-sm text-gray-400 md:hidden">
                          {category.description}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300 hidden md:table-cell max-w-xs truncate">
                      {category.description || "No description"}
                    </td>

                    <td className="py-4 px-6 hidden lg:table-cell">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.status === "Active"
                            ? "bg-green-900 text-green-300"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400 text-sm hidden lg:table-cell">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <EditButton category={category} />
                        <DeleteButton category={category} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {categories.length === 0 && !result.error && (
            <div className="text-center py-12">
              <p className="text-gray-400">
                No categories yet. Create your first category to get started.
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-black p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-white">
              {totalCategories}
            </div>
            <div className="text-gray-400 text-sm">Total Categories</div>
          </div>
          <div className="bg-black p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-white">
              {activeCategories}
            </div>
            <div className="text-gray-400 text-sm">Active Categories</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CategoryModal />
    </div>
  );
}
