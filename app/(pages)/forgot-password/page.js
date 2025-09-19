/* eslint-disable react/no-unescaped-entities */
import AnimationContainer from "@/app/components/AnimationContainer";
import Link from "next/link";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export const metadata = {
  title: "Esvibes - Forgot Password",
};

export default function page() {
  return (
    <AnimationContainer>
      <main className="w-full flex justify-center min-h-[80vh] items-center">
        <section className="w-full md:w-1/2 py-[80px]">
          <div className="flex justify-center items-center mb-2 flex-col">
            <span className="border new-variable-btn">Forgot Password</span>
            <p className="text-sm text-center mb-2 mt-2 text-gray-300">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <ForgotPasswordForm>
            <div className="flex flex-col   gap-2 mt-4">
              <p className="text-sm text-gray-300">
                Remember your password?
                <Link href="/login" className="ml-2 text-white underline">
                  Back to Login
                </Link>
              </p>
              <p className="text-sm text-gray-300">
                Don't have an account?
                <Link href="/register" className="ml-2 text-white underline">
                  Register
                </Link>
              </p>
            </div>
          </ForgotPasswordForm>
        </section>
      </main>
    </AnimationContainer>
  );
}
