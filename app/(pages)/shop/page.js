import AnimationContainer from "@/app/components/AnimationContainer";

import Searchbox from "./_components/Searchbox";
import SectionHeader from "../(profile)/_components/SectionHeader";
import InfiniteScrollProducts from "./_components/InfiniteScrollProducts";

export const metadata = {
  title: "Esvibes - Shop",
};
export default async function Page({ searchParams }) {
  const params = await searchParams;
  return (
    <AnimationContainer>
      <section className="min-h-screen py-[50px]">
        <SectionHeader title="শুধু আপনার জন্য">
          ES Vibes-এর সাথে উন্নত করুন আপনার স্টাইল — যেখানে প্রতিটি ডিজাইন
          স্থায়িত্বের প্রতিশ্রুতি বহন করে।
        </SectionHeader>
        <div className="grid grid-cols-3 gap-2 w-full">
          <Searchbox />
        </div>
        <InfiniteScrollProducts query={params?.query || ""} />
      </section>
    </AnimationContainer>
  );
}
