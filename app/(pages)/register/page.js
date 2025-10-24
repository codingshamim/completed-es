import AnimationContainer from "@/app/components/AnimationContainer";

import Link from "next/link";
import RegisterForm from "./_components/RegisterForm";
export const metadata = {
  title: "Esvibes - Register",
};
export default function page() {
  return (
    <AnimationContainer>
      <main className="w-full flex justify-center min-h-[80vh]  items-center">
        <section className="w-full md:w-1/2  py-[50px]">
          <div className="flex justify-center items-center mb-2 flex-col">
            <span className="border new-variable-btn bangla-font">
              অ্যাকাউন্ট তৈরি করুন
            </span>
            <p className="text-sm text-center mb-2 mt-2 text-gray-300 bangla-font">
              এখন যোগ দিন এবং আমাদের এক্সক্লুসিভ ডিজাইন, বিশেষ ডিল এবং নতুন
              আগমনগুলি প্রথমে আবিষ্কার করুন!
            </p>
          </div>

          <RegisterForm>
            <div>
              <p className="text-sm mt-4 text-gray-300 bangla-font">
                যদি আপনার ইতিমধ্যেই একটি অ্যাকাউন্ট থাকে
                <Link
                  href="/login"
                  className="ml-2 text-white underline bangla-font"
                >
                  লগিন করুন
                </Link>
              </p>
            </div>
          </RegisterForm>
        </section>
      </main>
    </AnimationContainer>
  );
}
