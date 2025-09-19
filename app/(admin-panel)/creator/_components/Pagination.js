// 3. Enhanced Production-Ready Pagination Component
// components/Pagination.js
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function Pagination({ totalProducts, currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const limit = parseInt(searchParams.get('limit') || '10');

  // Calculate visible page numbers with ellipsis
  const visiblePages = useMemo(() => {
    const delta = 2; // Number of pages to show on each side of current page
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);
    
    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push('...');
    }
    
    // Add pages around current page
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }
    
    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', newLimit.toString());
    params.set('page', '1'); // Reset to first page
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalProducts);

  // Don't render pagination if there's only one page or no products
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-dark-800/60 to-dark-700/60 px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-700/50 space-y-4 sm:space-y-0">
      {/* Left side - Items per page and showing info */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <select
          value={limit}
          onChange={handleLimitChange}
          className="bg-dark-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Items per page"
        >
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>
        <span className="text-sm text-gray-400">
          Showing {start}-{end} of {totalProducts.toLocaleString()} products
        </span>
      </div>

      {/* Right side - Page navigation */}
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 lg:px-4 py-2 text-sm text-gray-400 border border-gray-600 rounded-lg hover:bg-dark-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to previous page"
        >
          Previous
        </button>

        {/* Page numbers */}
        <div className="hidden sm:flex items-center space-x-1">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-sm text-gray-400"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 lg:px-4 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 border border-gray-600 hover:bg-dark-700'
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Mobile: Show only current page info */}
        <div className="sm:hidden flex items-center space-x-2">
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 lg:px-4 py-2 text-sm text-gray-400 border border-gray-600 rounded-lg hover:bg-dark-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}