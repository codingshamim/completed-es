import HeroContent from "@/app/_components/HeroContent";
import EventQuery from "../backend/queries/EventQuery";
import AnimationContainer from "../components/AnimationContainer";
import ProductsSection from "../sections/ProductsSection";
import ReusableImage from "@/app/_components/ReusableImage";

// Optional: Set revalidation time (in seconds) if you want ISR
// export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  // This will run at build time, not at request time
  const events = await EventQuery();
  const event = events?.product;

  return (
    <AnimationContainer>
      <section
        className={`flex justify-between flex-col md:flex-row items-center gap-4 ${
          event && "py-[50px]"
        }`}
      >
        {event && (
          <>
            <HeroContent
              originalPrice={event?.price}
              discount={event?.discount}
              title={event?.title}
              slug={event?.slug}
              ability={event?.ability}
              id={event?._id}
              productId={event?.product}
              stock={event?.stock}
            />
            <ReusableImage
              src={event?.thumbnail}
              alt={event?.title}
              href={`/tshirt/${event?.slug}`}
            />
          </>
        )}
      </section>
      <main>
        <ProductsSection />
      </main>
    </AnimationContainer>
  );
}
