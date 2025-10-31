"use client";

import { Loader2 } from "lucide-react"; // lightweight spinner icon
import { motion } from "framer-motion";

export default function SecondaryLoadingBtn({
  loading,
  children,
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      disabled={loading}
      className={`relative flex items-center justify-center gap-2 rounded-sm px-4 py-2 font-medium text-sm transition-all duration-300 active:scale-[98%] 
        ${loading ? "opacity-70 cursor-not-allowed" : ""} 
        ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin size-[17px]" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
