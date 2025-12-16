"use client";

import useCommonState from "@/app/src/hooks/useCommonState";
import { MessageSquare } from "lucide-react";

export default function ChatButton() {
  const { common, setCommon } = useCommonState();
  return (
    <button
      type="button"
      className="fixed bottom-20 flex z-50 justify-center items-center hover:bg-white/80 right-10 md:right-20 size-12 bg-white text-black rounded-full"
      onClick={() => setCommon({ ...common, chatModal: true })}
    >
      <MessageSquare size={25} />
    </button>
  );
}
