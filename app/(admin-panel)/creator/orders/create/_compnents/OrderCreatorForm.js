// CLIENT COMPONENT (OrderCreatorForm.jsx)
"use client";

import { useState } from "react";
import useCommonState from "@/app/src/hooks/useCommonState";
import generateTransactionId from "@/helpers/generateTransactionId";
import DashboardHeader from "../../../_components/Dashboard/DashboardHeader";
import { createOrderFromAdmin } from "@/app/actions/order.action";
import { useRouter } from "next/navigation";
import { createNotification } from "@/app/backend/actions/notification.action";

export default function OrderCreatorForm({ children }) {
  const { common, setCommon } = useCommonState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  // Validation
  const validateForm = (address, orders) => {
    const errors = {};

    if (!address.name?.trim()) errors.name = "Name is required";
    if (!address.phone?.trim()) errors.phone = "Phone is required";
    if (!address.address?.trim()) errors.address = "Address is required";
    if (!address.district?.trim()) errors.district = "District is required";
    if (!address.city?.trim()) errors.city = "City is required";

    const phonePattern = /^(?:\+8801|01)[3-9]\d{8}$/;
    if (address.phone && !phonePattern.test(address.phone.trim())) {
      errors.phone = "Please enter a valid Bangladesh phone number";
    }

    if (!orders || orders.length === 0) {
      errors.orders = "At least one product must be selected";
    }

    if (!common?.payementMethod) {
      errors.payment = "Payment method is required";
    }

    if (!common?.selectedShippingOption) {
      errors.shipping = "Shipping option is required";
    }

    return errors;
  };

  // Submit Handler
  async function handleCreateOrder(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setResponse(null);
    setFormErrors({});

    try {
      // FIXED SIZE CLEANING LOGIC HERE
      const cleanedData =
        common?.selectedProducts?.map(
          ({ sizes, sku, thumbnail, title, size, ...rest }) => ({
            ...rest,
            size: size?.size || "", // "M"
          })
        ) || [];

      const orders = cleanedData;

      const address = {
        name: e.target.name.value.trim() || "",
        phone: e.target.phone.value.trim() || "",
        address: e.target.address.value.trim() || "",
        postalCode: e.target.postalCode.value.trim() || "",
        district: e.target.district.value.trim() || "",
        city: e.target.city.value.trim() || "",
      };

      const errors = validateForm(address, orders);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setIsSubmitting(false);
        return;
      }

      const orderObject = {
        orders,
        address,
        delivered: "Pending",
        transactionId: generateTransactionId(),
        paymentStatus: "pending",
        paymentMethod: common?.payementMethod || "Bkash",
        shippingOption: common?.selectedShippingOption,
        orderDate: new Date().toISOString(),
        totalAmount: orders.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

      const apiResponse = await createOrderFromAdmin(orderObject);
      setResponse(apiResponse);

      await createNotification({
        title: "New Order Received",
        message: `You have a new order from customer ${apiResponse?.data?.address?.phone}`,
        type: "order",
      });

      router.push(`/creator/order/${apiResponse?.data?.transactionId}`);

      if (!apiResponse.error) {
        e.target.reset();
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      setResponse({
        error: true,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleCreateOrder}
      className="min-h-screen bg-black text-white"
    >
      <div className="px-8 py-4">
        <DashboardHeader title="Create Order">
          You can create custom order form here
        </DashboardHeader>

        {response && (
          <div
            className={`border px-4 py-3 rounded-lg mb-6 ${
              response.error
                ? "bg-red-900/30 border-red-500/50 text-red-200"
                : "bg-green-900/30 border-green-500/50 text-green-200"
            }`}
          >
            {response.message}
          </div>
        )}

        {Object.keys(formErrors).length > 0 && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">
              Please fix the following errors:
            </h3>
            <ul className="text-sm space-y-1">
              {Object.entries(formErrors).map(([field, error]) => (
                <li key={field}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {isSubmitting && (
          <div className="bg-blue-900/30 border border-blue-500/50 text-blue-200 px-4 py-3 rounded-lg mb-6">
            Creating order... Please wait.
          </div>
        )}
      </div>

      <div className="px-8">{children}</div>
    </form>
  );
}
