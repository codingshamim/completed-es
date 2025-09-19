"use client";
import LoadingBtn from "@/app/_components/LoadingBtn";
import { createUserAction } from "@/app/backend/actions";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm({ children }) {
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
    setLoading(true);
    e.preventDefault();
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
  return (
    <form onSubmit={handleRegister}>
      {" "}
      <div className="form-control">
        <label htmlFor="name">Name</label>
        <input
          name="fName"
          onChange={handleChange}
          value={registerState?.fName}
          type="text"
          placeholder="Enter Your Name"
          className={`${
            error?.error === "name-error" && "!border !border-red-600"
          }`}
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
          className="svg lucide lucide-receipt-text"
        >
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M14 8H8" />
          <path d="M16 12H8" />
          <path d="M13 16H8" />
        </svg>
        {error?.error === "name-error" && (
          <p className="text-xs mt-2  text-red-600">{error?.message}</p>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="name">Phone</label>
        <input
          onChange={handleChange}
          name="phone"
          value={registerState?.phone}
          type="number"
          className={`${
            error?.error === "phone-error" && "!border !border-red-600"
          }`}
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
        {error?.error === "phone-error" && (
          <p className="text-xs mt-2  text-red-600">{error?.message}</p>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="name">Password</label>
        <input
          name="password"
          onChange={handleChange}
          value={registerState?.password}
          type={isShow ? "text" : "password"}
          placeholder="Enter Your Password"
          className={`${
            error?.error === "password-error" && "!border !border-red-600"
          }`}
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
            className="lucide lucide-eye absolute top-[41px] right-2 cursor-pointer select-none"
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
      {children}
      <LoadingBtn
        customClass="mt-4 font-medium flex items-center gap-2 justify-center !py-[7px] w-full "
        loading={loading}
      >
        <UserPlus width={18} height={18} />
        Register
      </LoadingBtn>
    </form>
  );
}
