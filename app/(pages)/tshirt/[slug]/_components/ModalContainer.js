"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function ModalContainer({ modalContent }) {
  const { common } = useCommonState();
  return (
    <>
      {common?.modal && (
        <div className=" fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.6)] z-50 flex justify-center items-center">
          {common?.modalContent}
        </div>
      )}
    </>
  );
}
