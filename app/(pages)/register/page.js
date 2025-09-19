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
            <span className="border new-variable-btn">Create Account</span>
            <p className="text-sm text-center mb-2 mt-2 text-gray-300">
              Join now and be the first to discover our exclusive designs,
              special deals, and new arrivals!
            </p>
          </div>

          <RegisterForm>
            <div>
              <p className="text-sm mt-4 text-gray-300">
                If you already have an account to
                <Link href="/login" className="ml-2 text-white underline">
                  Login
                </Link>
              </p>
            </div>
          </RegisterForm>
        </section>
      </main>
    </AnimationContainer>
  );
}
