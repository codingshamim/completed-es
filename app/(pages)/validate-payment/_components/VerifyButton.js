"use client";

import { useFormStatus } from "react-dom";

function VerifyButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-white hover:bg-gray-200 text-black py-3 px-4 rounded transition-colors font-medium disabled:opacity-50"
    >
      {pending ? "Verifying..." : "Verify Payment"}
    </button>
  );
}

export default VerifyButton;
