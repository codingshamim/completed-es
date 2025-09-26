"use client";
import AnimationContainer from "@/app/components/AnimationContainer";
import ProductItem from "@/app/components/ProductItem";
import { useEffect, useState, useRef } from "react";
import { getAllProducts } from "@/app/backend/queries/ProductQuery";

export default function InfiniteScrollProducts({ query = "", filter = {} }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);
  const isInitialMount = useRef(true);
  const currentQuery = useRef(query);
  const currentFilter = useRef(filter);

  // Check if query or filter changed
  const queryOrFilterChanged =
    currentQuery.current !== query ||
    JSON.stringify(currentFilter.current) !== JSON.stringify(filter);

  // Reset state when query or filter changes
  useEffect(() => {
    if (queryOrFilterChanged) {
      setProducts([]);
      setPage(1);
      setHasMore(true);
      setLoading(false);
      isInitialMount.current = true;
      currentQuery.current = query;
      currentFilter.current = filter;
    }
  }, [query, filter, queryOrFilterChanged]);

  // Fetch products function (not memoized to avoid dependency issues)
  const fetchProducts = async (pageNum) => {
    if (loading) return;

    setLoading(true);
    try {
      const newProducts = await getAllProducts(query, filter, pageNum, 12);

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => {
          if (pageNum === 1) {
            return newProducts;
          }
          // Prevent duplicates
          const existingIds = new Set(prev.map((p) => p._id));
          const uniqueNewProducts = newProducts.filter(
            (p) => !existingIds.has(p._id)
          );
          return [...prev, ...uniqueNewProducts];
        });
        setPage(pageNum + 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load effect
  useEffect(() => {
    if (isInitialMount.current) {
      fetchProducts(1);
      isInitialMount.current = false;
    }
  }, [query, filter, fetchProducts]); // Only depend on query and filter

  // Intersection observer effect
  useEffect(() => {
    if (loading || !hasMore || isInitialMount.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchProducts(page);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [page, hasMore, loading, fetchProducts]); // Simple dependencies

  return (
    <>
      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {products.map((product) => (
            <ProductItem
              id={product._id}
              thumbnail={product.thumbnail}
              title={product.title}
              description={product.description}
              price={product.price}
              discount={product.discount}
              key={product._id}
              slug={product.slug}
              stock={product.stock}
              quantity={product.quantity}
            />
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="w-[40px] h-[40px] border border-gray-300 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && products.length === 0 && !isInitialMount.current && (
        <AnimationContainer>
          <div className="min-h-[50vh] flex justify-center items-center flex-col gap-2 w-full">
            <h2>No Products Found!</h2>
          </div>
        </AnimationContainer>
      )}

      {/* Sentinel for infinite scroll */}
      {hasMore && !loading && <div ref={observerRef} className="h-10 w-full" />}
    </>
  );
}
