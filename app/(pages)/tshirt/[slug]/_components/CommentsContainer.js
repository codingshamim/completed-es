import CustomerReview from "./CustomerReview";

export default function CommentsContainer({ reviews }) {
  return (
    <>
      {reviews && (
        <section className="mb-6">
          {reviews.length > 0 && <h1>Customer Review</h1>}
          {reviews.length > 0 &&
            reviews &&
            reviews.map((review) => (
              <CustomerReview
                key={review?._id}
                content={review?.content}
                userName={review?.user?.name}
              />
            ))}
        </section>
      )}
    </>
  );
}
