"use client";
import LoadingBtn from "@/app/_components/LoadingBtn";
import { updatePasswordAction } from "@/app/backend/actions";
import useCommonState from "@/app/src/hooks/useCommonState";
import { useState } from "react";

export default function PasswordInfo() {
  const [passState, setPassState] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    error: "",
    message: "",
  });
  const { common, setCommon } = useCommonState();
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setError({
      ...error,
      error: "",
      message: "",
    });
    setPassState({
      ...passState,
      [name]: value,
    });
  };
  const onUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    setError({
      ...error,
      error: "",
      message: "",
    });
    try {
      const response = await updatePasswordAction(passState);
      if (response && response?.error) {
        setError({
          ...error,
          ...response,
        });
      } else {
        setCommon({
          ...common,
          toast: true,
          toastMessage: "Successfully changed your password",
          toastSuccess: true,
        });
      }
    } catch (err) {
      setError({
        ...error,
        error: "nandc-error",
        message: err?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onUpdatePassword} className="nav-border p-3 mt-4">
      <h1 className="font-medium">Change Your Password</h1>
      <div className={`form-control ${loading ? "opacity-50" : "opacity-100"}`}>
        <label htmlFor="password">Old Password</label>
        <input
          onChange={handleChange}
          value={passState?.password}
          name="password"
          className={`${
            error.error === "password-error" && " !border-red-600"
          }`}
          type={isShow ? "text" : "password"}
          placeholder="Old Password"
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
        {error?.error === "password-error" && (
          <p className="text-xs mt-2  text-red-600">{error?.message}</p>
        )}
      </div>
      <div className={`form-control ${loading ? "opacity-50" : "opacity-100"}`}>
        <label htmlFor="name">New Password</label>
        <input
          name="newPassword"
          onChange={handleChange}
          value={passState?.newPassword}
          type={isShow ? "text" : "password"}
          placeholder="New Password"
          className={`${
            error.error === "newpass-error" ||
            (error.error === "nandc-error" && " !border-red-600")
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

        {error?.error === "confirmpass-error" ||
          (error?.error === "nandc-error" && (
            <p className="text-xs mt-2  text-red-600">{error?.message}</p>
          ))}
      </div>
      <div
        className={`form-control mb-4 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        <label htmlFor="name">Confirm Password</label>
        <input
          name="confirmPassword"
          onChange={handleChange}
          value={passState?.confirmPassword}
          type={isShow ? "text" : "password"}
          placeholder=" Confirm Passowrd"
          className={`${
            error.error === "newpass-error" ||
            (error.error === "nandc-error" && " !border-red-600")
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

        {error?.error === "confirmpass-error" ||
          (error?.error === "nandc-error" && (
            <p className="text-xs mt-2  text-red-600">{error?.message}</p>
          ))}
      </div>
      <LoadingBtn loading={loading} className="mt-4">
        Save Changes
      </LoadingBtn>
    </form>
  );
}
