"use client";

import LoadingBtn from "@/app/_components/LoadingBtn";
import { updateUserAction } from "@/app/backend/actions";
import useCommonState from "@/app/src/hooks/useCommonState";
import { useState } from "react";

export default function PersonalInfo({ name, phone }) {
  const [info, setInfo] = useState({
    name: name,
    phone: phone,
  });

  const { common, setCommon } = useCommonState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: "",
    message: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  const handleUpdatePesonalInfo = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await updateUserAction(info);

      if (response?.error) {
        setError({
          ...error,
          ...response,
        });
      } else {
        setCommon({
          ...common,
          toast: true,
          toastMessage: "Successfully updated your profile information",
        });
        setError({
          ...error,
          error: "",
          message: "",
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleUpdatePesonalInfo}
      className="personal-info nav-border p-3 mt-4"
    >
      <h1 className="font-medium">Update Personal Information</h1>
      <div className={`form-control ${loading && "opacity-50"}`}>
        <label htmlFor="name">Name</label>
        <input
          onChange={handleChange}
          value={info?.name}
          type="text"
          name="name"
          placeholder="Enter Your Name"
          className={`${error.error === "name-error" && "!border-red-600"}`}
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
        {error.error === "name-error" && (
          <p className="text-red-600 text-sm mt-2">{error.message}</p>
        )}
      </div>
      <div className={`form-control mb-2  ${loading && "opacity-50"}`}>
        <label htmlFor="name">Phone</label>
        <input
          onChange={handleChange}
          name="phone"
          value={info?.phone}
          type="number"
          placeholder="Enter Your Phone"
          className={`${error.error === "phone-error" && "!border-red-600"}`}
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
        {error.error === "phone-error" && (
          <p className="text-red-600 text-sm mt-2">{error.message}</p>
        )}
      </div>
      <LoadingBtn loading={loading} className="mt-4">
        Save Changes
      </LoadingBtn>
    </form>
  );
}
