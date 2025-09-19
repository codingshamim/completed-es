"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function DeleteAccount({ children }) {
  const { common, setCommon } = useCommonState();
  return (
    <div className="border border-red-500 p-3 mt-4">
      <h2>Delete Account</h2>
      <p className="text-xs text-gray-300">
        Permanently remove your Personal Account and all of its contents from
        the platform. This action is not reversible, so please continue with
        caution.
      </p>
      <button
        className="variable-btn mt-4 bg-red-500"
        onClick={() => {
          setCommon({
            ...common,
            modal: true,
            modalContent: (
              <div className="bg-secondary p-4 px-6 rounded-lg min-w-[300px] sm:min-w-[400px]">
                {children}
              </div>
            ),
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
