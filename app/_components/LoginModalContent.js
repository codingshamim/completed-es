import Link from "next/link";
import CloseButton from "./CloseButton";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin";
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
            <Link
              href="/login"
              className="w-full bg-black hover:bg-secondary hover:border-transparent text-white  py-3 px-6 rounded-sm flex items-center justify-center gap-3 transition-all duration-200  active:scale-95 border border-gray-700 hover:border-gray-600  "
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-base bangla-font">
                ফোন নম্বর দিয়ে লগিন করুন
              </span>
            </Link>
          </div>

          {/* Footer Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
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
