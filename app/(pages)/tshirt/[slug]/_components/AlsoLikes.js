import getCategoryWiseProduct from "@/app/backend/queries/getCategoryWiseProduct";
import AlsoLikeItem from "./AlsoLikeItem";

export default async function AlsoLikes({ category, productId }) {
  const likedProducts = await getCategoryWiseProduct(category[0], productId);

  return (
    <section>
      {likedProducts.length > 0 && (
        <h2 className="text-2xl font-medium mb-4">You may also like</h2>
      )}
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
