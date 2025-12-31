import Link from "next/link";
import CloseButton from "./CloseButton";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin";
import PhoneLoginButton from "./PhoneLoginButton";
export default function LoginModalContent() {
  return (
    <div className="relative w-full max-w-md z-10">
      {/* Modal Content */}
      <CloseButton />
      <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="text-center p-10 pb-6 border-b border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-3 bangla-font">
            লগিন
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed bangla-font">
            এখনই যোগদান করুন এবং আমাদের এক্সক্লুসিভ ডিজাইন, বিশেষ অফার এবং নতুন
            আগতদের আবিষ্কারে প্রথম হন!
          </p>
        </div>

        {/* Content */}
        <div className="p-10 pt-6">
          {/* Login Buttons */}
          <div className="space-y-4">
            {/* Google Button */}
            <GoogleLogin />

            {/* Facebook Button */}
            <FacebookLogin />

            {/* Phone Number Button */}
            <PhoneLoginButton />
          </div>

          {/* Footer Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-white hover:text-gray-300 font-medium transition-colors hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
