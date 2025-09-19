/* eslint-disable react/no-unescaped-entities */
import AnimationContainer from "@/app/components/AnimationContainer";
import Link from "next/link";
import LoginForm from "./_components/LoginForm";

export const metadata = {
  title: "Esvibes - Login",
};

export default function page() {
  return (
    <AnimationContainer>
      <main className="w-full flex justify-center min-h-[80vh] items-center">
        <section className="w-full md:w-1/2  py-[80px]">
          <div className="flex justify-center items-center mb-2 flex-col">
            <span className="border new-variable-btn">Login</span>
            <p className="text-sm text-center mb-2 mt-2 text-gray-300">
              Join now and be the first to discover our exclusive designs,
              special deals, and new arrivals!
            </p>
          </div>

          <LoginForm>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-4">
              <p className="text-sm text-gray-300">
                Don't have an account?
                <Link href="/register" className="ml-2 text-white underline">
                  Register
                </Link>
              </p>
              <Link
                href="/forgot-password"
                className="text-sm text-white underline"
              >
                Forgot Password?
              </Link>
            </div>
          </LoginForm>
        </section>
      </main>
    </AnimationContainer>
  );
}
