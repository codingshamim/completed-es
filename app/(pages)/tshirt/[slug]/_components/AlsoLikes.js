import getCategoryWiseProduct from "@/app/backend/queries/getCategoryWiseProduct";
import AlsoLikeItem from "./AlsoLikeItem";

export default async function AlsoLikes({ category }) {
  const likedProducts = await getCategoryWiseProduct(category[0]);

  return (
    <section>
      <h1 className="mb-2">You may also like</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {likedProducts.length > 0 &&
          likedProducts &&
          likedProducts.map((likeItem) => (
            <AlsoLikeItem
              productId={likeItem?._id}
              stock={likeItem?.stock}
              key={likeItem?._id}
              price={likeItem?.price}
              discount={likeItem?.discount}
              thumbnail={likeItem?.thumbnail}
              slug={likeItem?.slug}
            />
          ))}
      </div>
    </section>
  );
}
