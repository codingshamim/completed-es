"use client";

import LoadingBtn from "@/app/_components/LoadingBtn";
import { ceredntialLogin } from "@/app/backend/actions";
import { LogIn, Eye, EyeOff, Phone, Lock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({ children }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [loginState, setLoginState] = useState({
    phone: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setError(null);
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError(null);
    try {
      await ceredntialLogin(loginState);
      router.push("/");
    } catch (err) {
      setError("Incorrect phone or password");
    } finally {
      setLoading(false);
    }
  };

  // Check if form is valid (both fields filled)
  const isFormValid =
    loginState.phone.trim() !== "" && loginState.password.trim() !== "";

  return (
    <form onSubmit={handleLogin} className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        {/* Enhanced Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30  p-4 flex items-start space-x-3 backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-300">Login Failed</p>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Phone Field */}
        <div className="form-control space-y-2">
          <label
            htmlFor="phone"
            className="block text-white text-sm font-medium"
          >
            Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-[26px] transform -translate-y-1/2 w-4 h-4 text-white" />
            <input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={loginState.phone}
              type="text"
              disabled={loading}
              className={`w-full bg-transparent border !py-[7px]  pl-10 pr-4  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 ${
                error
                  ? "!border-red-500 bg-red-900/10"
                  : "border-gray-600 hover:border-gray-500"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              placeholder="+8801XXXXXXXXX"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-control space-y-2">
          <label
            htmlFor="password"
            className="block text-white text-sm font-medium"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-[26px] transform -translate-y-1/2 w-4 h-4 text-white" />
            <input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              id="password"
              name="password"
              onChange={handleChange}
              value={loginState?.password}
              type={isShow ? "text" : "password"}
              disabled={loading}
              placeholder="password123"
              className={`w-full bg-transparent border  pl-10 pr-12 !py-[7px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 ${
                error
                  ? "!border-red-500 bg-red-900/10"
                  : "border-gray-600 hover:border-gray-500"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            <button
              type="button"
              onClick={() => setIsShow(!isShow)}
              disabled={loading}
              className="absolute right-3 top-[26px] transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isShow ? (
                <EyeOff className="w-4 h-4 text-white" />
              ) : (
                <Eye className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Children - Register/Forgot Password links */}
        <div>{children}</div>

        {/* Enhanced Login Button - using your LoadingBtn */}
        <LoadingBtn
          loading={loading}
          disabled={!isFormValid}
          customClass="mt-2 font-medium flex items-center justify-center gap-2 !py-[7px] w-full"
        >
          <LogIn width={18} height={18} />
          Login
        </LoadingBtn>

        {/* Form Status Indicator */}
        {!isFormValid && !loading && (
          <p className="text-xs text-gray-400 text-center mt-2">
            Please fill in all fields to continue
          </p>
        )}
      </div>
    </form>
  );
}
