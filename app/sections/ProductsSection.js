import Link from "next/link";
import SectionHeader from "../(pages)/(profile)/_components/SectionHeader";
import { getAllProducts } from "../backend/queries/ProductQuery";

import ProductItem from "../components/ProductItem";
import NoProductsFound from "./_components/NoProductsFound";
import { ChevronRight } from "lucide-react";

export default async function ProductsSection() {
  const products = await getAllProducts("", "", 1, 12);
  return (
    <>
      {products && products.length > 0 ? (
        <section className="min-h-screen py-[50px]">
          <SectionHeader title="Handpicked for You">
            Elevate your lifestyle with ES Vibes – where timeless design meets
            lasting quality.
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {products.length > 0 && products
              ? products.map((product) => (
                  <ProductItem
                    id={product?._id}
                    thumbnail={product?.thumbnail}
                    title={product?.title}
                    description={product?.description}
                    price={product?.price}
                    discount={product?.discount}
                    key={product?._id}
                    slug={product?.slug}
                    stock={product?.stock}
                    quantity={product?.quantity}
                  />
                ))
              : "No Products Found!"}
          </div>

          {products?.length === 9 && (
            <div className="flex justify-center items-center mt-4">
              {" "}
              <Link href="/shop" className="new-btn w-[150px]">
                <ChevronRight size={18} />
                See More
              </Link>
            </div>
          )}
        </section>
      ) : (
        <NoProductsFound />
      )}
    </>
  );
}
