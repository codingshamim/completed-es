"use client";

import { useState } from "react";
import useCommonState from "@/app/src/hooks/useCommonState";
import DeleteProductModalContent from "./DeleteProductModalContent";
import { deleteProductById } from "@/app/actions/product.action";
import { deleteOrder } from "@/app/actions/order.action";

export default function ConfirmationModal() {
  const { common, setCommon } = useCommonState();
  const [isDeleting, setIsDeleting] = useState(false);

  const closeHandler = () => {
    setCommon((prev) => ({
      ...prev,
      isOpenModal: false,
      deleteProduct: {
        title: "",
        sku: "",
        thumbnail: "",
      },
    }));
  };
  let content = null;
  let buttonContent = "";
  if (common?.modalMode === "delete-product") {
    buttonContent = "Delete Product";
  } else if (common?.modalMode === "delete-order") {
    buttonContent = "Delete Order";
  }
  if (common?.modalMode === "delete-product") {
    content = (
      <DeleteProductModalContent
        thumbnail={
          common?.deleteProduct?.thumbnail
            ? common?.deleteProduct?.thumbnail
            : ""
        }
        title={common?.deleteProduct?.title || ""}
        sku={common?.deleteProduct?.sku || ""}
      />
    );
  } else if (common?.modalMode === "delete-order") {
    content = (
      <p className="text-sm mt-4 mb-2">
        Are you sure you want to delete this order? This action cannot be undone
      </p>
    );
  }
  let handler;

  if (common?.modalMode === "delete-product") {
    handler = async () => {
      setIsDeleting(true);
      try {
        await deleteProductById(common?.deleteProduct?.id);
        closeHandler();
      } catch (error) {
        console.error("Error deleting product:", error);
        // Handle error appropriately
      } finally {
        setIsDeleting(false);
      }
    };
  } else if (common?.modalMode === "delete-order") {
    handler = async () => {
      setIsDeleting(true);
      try {
        await deleteOrder(common?.deleteOrder?.orderId);
        closeHandler();
      } catch (error) {
        console.error("Error deleting product:", error);
        // Handle error appropriately
      } finally {
        setIsDeleting(false);
      }
    };
  }

  return (
    <>
      {common?.isOpenModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            common?.isOpenModal ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Backdrop with blur effect */}
          <div
            id="modalBackdrop"
            className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300 ${
              common?.isOpenModal ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeHandler}
          />

          {/* Modal Container */}
          <div
            id="modalContainer"
            className={`relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl max-w-md w-full mx-4 transition-all duration-300 ease-out ${
              common?.isOpenModal
                ? "transform scale-100 translate-y-0 opacity-100"
                : "transform scale-90 translate-y-4 opacity-0"
            }`}
            style={{
              animation: common?.isOpenModal
                ? "modalSlideIn 0.3s ease-out forwards"
                : "none",
            }}
          >
            {/* Modal Content */}
            <div className="p-8">
              {/* Warning Icon with pulse animation */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
                  <svg
                    className="w-8 h-8 text-white"
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
              </div>

              {/* Title */}
              <div className="text-center mb-2">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {common?.modalTitle}
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-4" />
              </div>

              {content}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Cancel Button */}
                <button
                  onClick={closeHandler}
                  disabled={isDeleting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] border border-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Cancel
                </button>

                {/* Delete Button with Loading State */}
                <button
                  onClick={handler}
                  disabled={isDeleting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    buttonContent
                  )}
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <p className="text-xs text-gray-500 text-center">
                  <i className="fas fa-shield-alt mr-1" />
                  Your data is secure. This action only affects this specific
                  product.
                </p>
              </div>
            </div>

            {/* Close button in top-right corner */}
            <button
              onClick={closeHandler}
              disabled={isDeleting}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-700/50 hover:bg-gray-600/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-icon lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Add keyframe animation styles */}
      <style jsx>{`
        @keyframes modalSlideIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(16px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
