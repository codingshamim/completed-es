import AnimationContainer from "@/app/components/AnimationContainer";
import AlsoLikes from "./_components/AlsoLikes";

import ProductContent from "./_components/ProductContent";
import ProductImage from "./_components/ProductImage";
import getProductBySlug from "@/app/backend/queries/getProductById";

import getReviews from "@/app/backend/queries/getReviews";
import CommentsContainer from "./_components/CommentsContainer";
import isReviewd from "@/app/backend/queries/isReviewd";
import AddComment from "./_components/AddComment";
import siteSettings from "@/site-setting";
export async function generateMetadata({ params }) {
  const param = await params;
  const product = await getProductBySlug(param?.slug);

  return {
    title: `ES FITT | ${
      product?.title?.length > 50 ? product.title.slice(0, 50) : product.title
    }`,
    description: product.description.slice(0, 150),
    openGraph: {
      title: "ES FITT | " + product?.title,
      description: product?.description.slice(0, 150),
      images: [product?.thumbnail || siteSettings?.openGraph?.images?.[0]?.url],
    },
  };
}
export default async function page({ params }) {
  const param = await params;
  const product = await getProductBySlug(param?.slug);

  const reviews = await getReviews(product?._id);
  const rev = await isReviewd(product?._id);

  return (
    <AnimationContainer>
      {product.ok === false ? (
        <div className="min-h-[80vh] flex justify-center items-center flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={50}
            height={50}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-6 lucide lucide-circle-off"
          >
            <path d="m2 2 20 20" />
            <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" />
            <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92" />
          </svg>

          {product?.message}
        </div>
      ) : (
        <div className="pb-[50px]">
          <section className="flex justify-between flex-col md:flex-row gap-4 py-[50px]">
            <ProductImage
              thumbnail={product?.thumbnail}
              gallery={product.gallery}
              title={product?.title}
            />
            <ProductContent
              id={product?._id}
              sizes={product?.sizes}
              description={product?.description}
              title={product?.title}
              discount={product?.discount}
              stock={product?.stock}
              originalPrice={product?.price}
              ability={product?.ability}
            />
          </section>
          {rev.ok && <AddComment product={product?._id} />}
          <CommentsContainer reviews={reviews} />

          <AlsoLikes productId={product?._id} category={product?.category} />
        </div>
      )}
    </AnimationContainer>
  );
}
