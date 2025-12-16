"use client";
import LoadingBtn from "@/app/_components/LoadingBtn";
import { createUserAction } from "@/app/backend/actions";
import {
  UserPlus,
  Eye,
  EyeOff,
  User,
  Phone,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm({ children, socialLoginButtons }) {
  const router = useRouter();
  const [registerState, setRegisterState] = useState({
    fName: "",
    phone: "",
    password: "",
  });
  const [isShow, setIsShow] = useState(false);
  const [error, setError] = useState({
    error: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setError({
      error: "",
      message: "",
    });
    setRegisterState({
      ...registerState,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError({
      error: "",
      message: "",
    });

    try {
      const response = await createUserAction(registerState);
      if (response?.ok === "loggin-succes") {
        router.push("/");
      }
      if (response?.error) {
        setError({
          ...error,
          ...response,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check if form is valid (all fields filled)
  const isFormValid =
    registerState.fName.trim() !== "" &&
    registerState.phone.trim() !== "" &&
    registerState.password.trim() !== "";

  return (
    <form onSubmit={handleRegister} className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        {/* Enhanced Error Message */}
        {(error.error || error.message) && (
          <div className="bg-red-900/20 border border-red-500/30 p-4 flex items-start space-x-3 backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-300">
                Registration Failed
              </p>
              <p className="text-sm text-red-400">{error.message || error}</p>
            </div>
          </div>
        )}

        {/* Name Field */}
        <div className="form-control space-y-2">
          <label
            htmlFor="fName"
            className="block text-white text-sm font-medium bangla-font"
          >
            আপনার নাম
          </label>
          <div className="relative">
            <User className="absolute left-3 top-[26px] transform -translate-y-1/2 w-4 h-4 text-white" />
            <input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              id="fName"
              name="fName"
              onChange={handleChange}
              value={registerState?.fName}
              type="text"
              disabled={loading}
              placeholder="আপনার নাম লিখুন"
              className={`w-full bg-transparent bangla-font border !py-[7px] pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 ${
                error?.error === "name-error"
                  ? "!border-red-500 bg-red-900/10"
                  : "border-gray-600 hover:border-gray-500"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="form-control space-y-2">
          <label
            htmlFor="phone"
            className="block text-white text-sm font-medium bangla-font"
          >
            ফোন নম্বর
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-[26px] transform -translate-y-1/2 w-4 h-4 text-white" />
            <input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              id="phone"
              onChange={handleChange}
              name="phone"
              value={registerState?.phone}
              type="number"
              disabled={loading}
              className={`w-full bg-transparent border !py-[7px] pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 ${
                error?.error === "phone-error"
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
            className="block text-white text-sm font-medium bangla-font"
          >
            পাসওয়ার্ড
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
              value={registerState?.password}
              type={isShow ? "text" : "password"}
              disabled={loading}
              placeholder="password123"
              className={`w-full bg-transparent border !py-[7px] pl-10 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 ${
                error?.error === "password-error"
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

        {/* Children - Additional content */}
        {children}

        {/* Enhanced Register Button */}
        <LoadingBtn
          customClass="mt-4 bangla-font font-medium flex items-center gap-2 justify-center !py-3 w-full"
          loading={loading}
          disabled={!isFormValid}
        >
          <UserPlus width={18} height={18} />
          রেজিস্টার করুন
        </LoadingBtn>

        {/* Form Status Indicator */}
        {!isFormValid && !loading && (
          <p className="text-xs text-gray-400 text-center mt-2">
            Please fill in all fields to continue
          </p>
        )}
        {socialLoginButtons}
      </div>
    </form>
  );
}
