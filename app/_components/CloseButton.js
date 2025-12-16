"use client";
import { X } from "lucide-react";
import useCommonState from "../src/hooks/useCommonState";
export default function CloseButton() {
  const { common, setCommon } = useCommonState();
  return (
    <button
      onClick={() =>
        setCommon({
          ...common,
          loginModal: false,
        })
      }
      className="absolute top-4 right-4 cursor-pointer text-white hover:text-gray-400 transition-colors duration-200"
    >
      {" "}
      <X width={20} height={20} />
    </button>
  );
}
