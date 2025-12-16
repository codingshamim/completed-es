import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";

export default function SocialLoginButtons() {
  return (
    <>
      {" "}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[var(--bg-color)] text-gray-400 bangla-font">
            অথবা
          </span>
        </div>
      </div>
      {/* Social Login Buttons */}
      <div className="space-y-3">
        <GoogleLogin />

        <FacebookLogin />
      </div>
    </>
  );
}
