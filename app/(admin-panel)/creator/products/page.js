// app/creator/products/page.js
import getProducts from "@/app/backend/queries/getProducts";
import FilterAndSearch from "../_components/FilterAndSearch";
import PageHeader from "../_components/PageHeader";
import Pagination from "../_components/Pagination";
import TableHeader from "../_components/TableHeader";
import TableHeaderDesktop from "./_components/TableHeaderDesktop";
import ProductItemDesk from "./_components/ProductItemDesk";
import ProductItemPhone from "./_components/ProductItemPhone";

export default async function page({ searchParams }) {
  const param = await searchParams;

  // Extract pagination parameters
  const query = param?.query || "";
  const page = parseInt(param?.page) || 1;
  const limit = parseInt(param?.limit) || 10;

  const result = await getProducts(query, limit, page);

  // Safe destructuring with fallback values (works for both success and error)
  const {
    products = [],
    totalItems = 0,
    currentPage = 1,
    totalPages = 1,
    error = false,
    message = "",
  } = result || {};

  // Additional safety check
  const safeProducts = Array.isArray(products) ? products : [];

  // Handle error state (still show the table structure but with error message)
  const hasError = error && safeProducts.length === 0;

  const actionObj = {
    yes: true,
    title: "Add Product",
    target: "/creator/products/create",
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <PageHeader
        title="Products"
        subTitle="Manage your product inventory and listings"
      />

      {/* Filters and Search */}
      <FilterAndSearch actionButton={actionObj} />

      {/* Products Table */}
      <div className="bg-black rounded-sm border border-gray-700/50 overflow-hidden shadow-2xl">
        {/* Table Header */}
        <TableHeader
          title="Product Inventory"
          totalItems={`${totalItems} product${totalItems !== 1 ? "s" : ""}`}
        />

        {safeProducts.length === 0 ? (
          // Empty State or Error State
          <div className="text-center py-12">
            <div
              className={`text-lg mb-2 ${
                hasError ? "text-red-400" : "text-gray-400"
              }`}
            >
              {hasError ? "Error Loading Products" : "No products found"}
            </div>
            <div className="text-gray-500 text-sm">
              {hasError
                ? message || "Something went wrong"
                : query
                ? `Try adjusting your search query "${query}"`
                : "Start by adding your first product"}
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <TableHeaderDesktop />
                <tbody
                  className="divide-y divide-gray-700/30"
                  id="products-table-body"
                >
                  {safeProducts.map((product) => (
                    <ProductItemDesk key={product._id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-gray-700/30">
              {safeProducts.map((product) => (
                <ProductItemPhone key={product._id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* Pagination - only show if there are products */}
        {safeProducts.length > 0 && (
          <Pagination
            totalProducts={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}
