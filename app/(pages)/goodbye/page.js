/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Goodbye!</h1>
      <p className="text-lg mb-6">
        Your account has been successfully deleted. We're sad to see you go.
      </p>
      <div className="flex items-center gap-2">
        <Link href="/" className="btn">
          Back to Home
        </Link>
        <Link href="/register" className="variable-btn nav-border">
          Create New Account
        </Link>
      </div>
    </div>
  );
}
