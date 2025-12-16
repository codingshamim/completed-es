/* eslint-disable react/no-unescaped-entities */
import AnimationContainer from "@/app/components/AnimationContainer";
import Link from "next/link";
import LoginForm from "./_components/LoginForm";
import GoogleLogin from "@/app/_components/GoogleLogin";
import FacebookLogin from "@/app/_components/FacebookLogin";
import SocialLoginButtons from "@/app/_components/SocialLoginButtons";

export const metadata = {
  title: "ES FITT | Login",
};

export default function page() {
  return (
    <AnimationContainer>
      <main className="w-full flex justify-center min-h-[80vh] items-center">
        <section className="w-full md:w-1/2 py-[80px]">
          <div className="flex justify-center items-center mb-2 flex-col">
            <span className="border new-variable-btn bangla-font">লগিন </span>
            <p className="text-sm text-center mb-2 mt-2 text-gray-300 md:w-[80%] bangla-font">
              এখনই যোগদান করুন এবং আমাদের এক্সক্লুসিভ ডিজাইন, বিশেষ অফার এবং
              নতুন আগতদের আবিষ্কারে প্রথম হন!
            </p>
          </div>

          <LoginForm socialLoginButtons={<SocialLoginButtons />}>
            <div className="bangla-font flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-4">
              <p className="text-sm text-gray-300 bangla-font">
                কোন অ্যাকাউন্ট নেই?
                <Link
                  href="/register"
                  className="ml-2 bangla-font text-white underline"
                >
                  রেজিস্টার করুন
                </Link>
              </p>
            </div>
          </LoginForm>
        </section>
      </main>
    </AnimationContainer>
  );
}
