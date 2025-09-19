"use client";
import LoadingBtn from "@/app/_components/LoadingBtn";
import { ceredntialLogin } from "@/app/backend/actions";
import { LogIn } from "lucide-react";
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
    setLoading(true);
    setError(null);
    try {
      await ceredntialLogin(loginState);
      router.push("/");
    } catch (err) {
      setError("Incorrect Phone and Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <p className="text-red-600 text-xs mt-2 mb-2">{error}</p>
      <div className="form-control">
        <label htmlFor="phone">Phone</label>
        <input
          name="phone"
          onChange={handleChange}
          value={loginState.phone}
          type="text"
          className={`${error && "!border-red-600"}`}
          placeholder="Enter Your Phone"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg lucide lucide-book-user"
        >
          <path d="M15 13a3 3 0 1 0-6 0" />
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
          <circle cx={12} cy={8} r={2} />
        </svg>
      </div>
      <div className="form-control">
        <label htmlFor="name">Password</label>
        <input
          name="password"
          onChange={handleChange}
          value={loginState?.password}
          type={isShow ? "text" : "password"}
          placeholder="Enter Your Password"
          className={`${error && " !border-red-600"}`}
        />
        <svg
          onClick={() => setIsShow(true)}
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg lucide lucide-lock-keyhole"
        >
          <circle cx={12} cy={16} r={1} />
          <rect x={3} y={10} width={18} height={12} rx={2} />
          <path d="M7 10V7a5 5 0 0 1 10 0v3" />
        </svg>
        {isShow ? (
          <svg
            onClick={() => setIsShow(false)}
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=" lucide lucide-eye absolute top-[41px] right-2 cursor-pointer select-none"
          >
            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
            <path d="m2 2 20 20" />
          </svg>
        ) : (
          <svg
            onClick={() => setIsShow(true)}
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-eye absolute top-[41px] right-2 cursor-pointer select-none"
          >
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx={12} cy={12} r={3} />
          </svg>
        )}
        {error?.error === "password-error" && (
          <p className="text-xs mt-2  text-red-600">{error?.message}</p>
        )}
      </div>
      <div>{children}</div>
      <LoadingBtn
        loading={loading}
        customClass="mt-2 font-medium flex items-center justify-center gap-2 !py-[7px] w-full"
      >
        <LogIn width={18} height={18} />
        Login
      </LoadingBtn>
    </form>
  );
}
