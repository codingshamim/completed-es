"use client";

import { useState } from "react";
import { deleteCartItemById } from "@/app/backend/actions";
import useCommonState from "@/app/src/hooks/useCommonState";

export default function DeleteCartButton({ cartId, itemName = "item" }) {
  const { common, setCommon } = useCommonState();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteCartItemById(cartId);
      if (response.ok) {
        setCommon({
          ...common,
          toast: true,
          toastMessage: response?.message,
          toastSuccess: true,
        });
        setShowModal(false);
      } else {
        setCommon({
          ...common,
          toast: true,
          toastMessage: response?.message,
          toastSuccess: false,
        });
      }
    } catch (err) {
      setCommon({
        ...common,
        toast: true,
        toastMessage: err?.message,
        toastSuccess: false,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="variable-btn bg-red-600 hover:bg-red-400 transition-colors duration-200"
      >
        Delete
      </button>

      {/* Modal Backdrop */}
      {showModal && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            showModal ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleCancel}
        >
          {/* Modal Content */}
          <div
            className={`bg-black border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4 transform transition-all duration-300 ${
              showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-semibold">
                  Delete Cart Item
                </h3>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="mb-6">
              <p className="text-white text-base mb-2">
                Are you sure you want to delete this {itemName}?
              </p>
              <p className="text-gray-400 text-sm">
                This action cannot be undone. The item will be permanently
                removed from your cart.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancel}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
