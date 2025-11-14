/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import districts from "@/database/districts.json";
import cities from "@/database/cities.json";
import postcodes from "@/database/postcodes.json";
import generateTransactionId from "@/helpers/generateTransactionId";
import { makeCheckout } from "@/app/actions/checkout.action";
import mainPrice from "@/helpers/mainPrice";
import useCommonState from "@/app/src/hooks/useCommonState";

const shippingOptions = [
  {
    title: "Inside of Dhaka",
    fee: 40,
  },
  {
    title: "Outside of Dhaka",
    fee: 120,
  },
];

// Validation schemas
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s]+$/,
  },
  phone: {
    required: true,
    pattern: /^(?:\+8801|01)[3-9]\d{8}$/, // Bangladesh phone number pattern
  },
  address: {
    required: true,
    minLength: 10,
    maxLength: 500,
  },
  district: {
    required: true,
  },
  city: {
    required: true,
  },
};

export default function CheckoutSubmitter({
  children,
  cartItems = [],
  totalPrice,
  publicBuy,
}) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showCODModal, setShowCODModal] = useState(false);
  const [shipOption, setShipOption] = useState(null);
  const [formData, setFormData] = useState(null);
  const { common, setCommon } = useCommonState();

  const router = useRouter();
  const formRef = useRef(null);

  // Initialize district from common state
  useEffect(() => {
    if (common?.deliveryDistrict) {
      const selected = districts.find(
        (d) => d.name === common.deliveryDistrict
      );
      if (selected) {
        setSelectedDistrictId(selected.id);
        const matchedCities = cities.filter(
          (city) => city.district_id === selected.id
        );
        setFilteredCities(matchedCities);
      }
    }
  }, [common?.deliveryDistrict]);

  // Validation function
  const validateField = useCallback((name, value) => {
    const rule = validationRules[name];
    if (!rule) return "";

    if (rule.required && (!value || value.trim() === "")) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      return `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be at least ${rule.minLength} characters`;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed ${
        rule.maxLength
      } characters`;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      if (name === "name") {
        return "Name can only contain letters and spaces";
      }
      if (name === "phone") {
        return "Please enter a valid Bangladesh phone number";
      }
      return `Invalid ${name} format`;
    }

    return "";
  }, []);

  // Validate all form data
  const validateForm = useCallback(
    (data) => {
      const newErrors = {};

      Object.keys(validationRules).forEach((field) => {
        const error = validateField(field, data[field]);
        if (error) {
          newErrors[field] = error;
        }
      });

      // Validate payment method
      if (!data.paymentMethod) {
        newErrors.paymentMethod = "Payment method is required";
      }

      // Validate shipping option
      if (!data.shippingOption) {
        newErrors.shippingOption = "Shipping option is required";
      }

      // Validate cart items
      if (!cartItems || cartItems.length === 0) {
        newErrors.cart = "Your cart is empty";
      }

      return newErrors;
    },
    [cartItems, validateField]
  );

  // Sanitize input data
  const sanitizeData = useCallback((data) => {
    const sanitized = {};

    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "string") {
        // Basic XSS prevention - strip HTML tags and trim
        sanitized[key] = data[key].replace(/<[^>]*>?/gm, "").trim();
      } else {
        sanitized[key] = data[key];
      }
    });

    return sanitized;
  }, []);

  // Process order creation
  const processOrder = async (orderData) => {
    const checkoutResponse = await makeCheckout(orderData, publicBuy);

    if (checkoutResponse?.error) {
      throw new Error(
        checkoutResponse.message ||
          "Failed to process checkout. Please try again."
      );
    }

    return checkoutResponse;
  };

  // Handle COD confirmation
  const handleCODConfirm = async () => {
    setShowCODModal(false);
    setIsSubmitting(true);

    try {
      // Process the COD order
      const checkoutResponse = await processOrder(formData);

      if (
        checkoutResponse?.data?.orderId ||
        checkoutResponse?.data?.transactionId
      ) {
        const transactionId =
          checkoutResponse?.data?.transactionId ||
          checkoutResponse?.transactionId ||
          formData.transactionId;

        // Redirect to validate-payment page with transaction ID
        router.push(
          `/validate-payment?transaction=${transactionId}&method=cod`
        );
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      setSubmitError(
        error.message || "Failed to process order. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const form = new FormData(event.target);

      const rawData = Object.fromEntries(form.entries());
      const sanitizedData = sanitizeData(rawData);

      const address = {
        name: sanitizedData?.name || "",
        phone: sanitizedData?.phone || "",
        address: sanitizedData?.address || "",
        city: sanitizedData?.city || "",
        district: sanitizedData?.district || "",
        postalCode: sanitizedData?.postalCode || "",
      };

      const paymentMethod = sanitizedData?.paymentMethod || "";

      // FIX: Get shipping option from common state instead of form data
      const shippingOption = common?.shippingOption || shippingOptions[0];

      // Validate form
      const validationData = {
        ...address,
        paymentMethod,
        shippingOption: shippingOption, // Pass the entire object
      };

      const validationErrors = validateForm(validationData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
        setIsSubmitting(false);
        return;
      }

      // Validate cart items structure
      const validCartItems = cartItems.filter(
        (item) =>
          item.productId &&
          item.quantity &&
          item.price &&
          item.size &&
          typeof item.quantity === "number" &&
          typeof item.price === "number" &&
          item.quantity > 0 &&
          item.price > 0
      );

      if (validCartItems.length !== cartItems.length) {
        setSubmitError(
          "Some items in your cart are invalid. Please refresh and try again."
        );
        setIsSubmitting(false);
        return;
      }

      const transactionId = generateTransactionId();
      const orderData = {
        orders: validCartItems,
        address,
        paymentMethod,
        shippingOption,
        transactionId,
      };

      // Handle different payment methods
      if (paymentMethod === "cod") {
        // Show COD confirmation modal
        setFormData(orderData);
        setShipOption(shippingOption);
        setShowCODModal(true);
        setIsSubmitting(false);
      } else {
        // Handle online payment methods (bKash, Nagad, Rocket)
        const checkoutResponse = await processOrder(orderData);

        if (
          checkoutResponse?.data?.orderId ||
          checkoutResponse?.data?.transactionId
        ) {
          // Get transaction ID from response (check multiple possible locations)
          const transactionIdToUse =
            checkoutResponse?.data?.transactionId ||
            checkoutResponse?.transactionId ||
            transactionId;

          // Get payment method for URL parameter - normalize to lowercase
          const methodParam = paymentMethod.toLowerCase();

          // Redirect to validate-payment page
          router.push(
            `/validate-payment?transaction=${transactionIdToUse}&method=${methodParam}`
          );
        } else {
          throw new Error("Failed to create order");
        }
      }
    } catch (error) {
      setSubmitError(
        error.message || "An unexpected error occurred. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Clear error for the field being changed
      if (errors[name]) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }

      // Real-time validation
      const fieldError = validateField(name, value);
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }

      // District change logic
      if (name === "district") {
        const selected = districts.find((d) => d.name === value);
        if (selected) {
          setSelectedDistrictId(selected.id);
          const matchedCities = cities.filter(
            (city) => city.district_id === selected.id
          );
          setFilteredCities(matchedCities);
          setPostalCode("");

          // Update common state with selected district
          setCommon((prev) => ({
            ...prev,
            deliveryDistrict: value,
          }));

          // Clear city error if district is selected
          setErrors((prev) => {
            const updated = { ...prev };
            delete updated.city;
            return updated;
          });
        } else {
          setFilteredCities([]);
          setSelectedDistrictId(null);
          setPostalCode("");

          // Clear delivery district from common state
          setCommon((prev) => ({
            ...prev,
            deliveryDistrict: null,
          }));
        }
      }

      // City change logic
      if (name === "city") {
        const matchedPostcode = postcodes.find(
          (p) =>
            p.district_id === selectedDistrictId &&
            p.upazila.toLowerCase() === value.toLowerCase()
        );
        setPostalCode(matchedPostcode?.postCode || "");
      }
    },
    [errors, validateField, selectedDistrictId, setCommon]
  );

  const inputBaseClass =
    "bg-black px-4 py-2 w-full text-white text-sm border transition-colors duration-200 focus:outline-none focus:border-white ";

  const getInputClass = (field) =>
    `${inputBaseClass} ${
      errors[field]
        ? "!border-red-500 focus:ring-red-500"
        : "outline-none border-gray-600 focus:border-white"
    }`;

  return (
    <>
      <form onSubmit={handleCheckout} ref={formRef} noValidate>
        {submitError && (
          <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="bg-green-900/20 border border-green-500 text-green-400 px-4 py-3 rounded mb-4">
            {submitSuccess}
          </div>
        )}

        <div className="border border-gray-700 p-4 space-y-4 mt-4">
          <h2 className="font-semibold text-lg bangla-font">ডেলিভারি ঠিকানা</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="আপনার নাম *"
                onChange={handleChange}
                className={`${getInputClass("name")} bangla-font`}
                maxLength={100}
                disabled={isSubmitting}
                required
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="text-red-500 text-xs mt-1"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="ফোন নম্বর (01XXXXXXXXX) *"
                onChange={handleChange}
                className={`${getInputClass("phone")} bangla-font`}
                maxLength={14}
                disabled={isSubmitting}
                required
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p
                  id="phone-error"
                  className="text-red-500 text-xs mt-1"
                  role="alert"
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {/* District */}
            <div>
              <select
                name="district"
                onChange={handleChange}
                className={`${getInputClass("district")} bangla-font`}
                value={common?.deliveryDistrict || ""}
                disabled={isSubmitting}
                required
                aria-invalid={errors.district ? "true" : "false"}
                aria-describedby={
                  errors.district ? "district-error" : undefined
                }
              >
                <option value="" disabled>
                  জেলা নির্বাচন করুন *
                </option>
                {districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p
                  id="district-error"
                  className="text-red-500 text-xs mt-1"
                  role="alert"
                >
                  {errors.district}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <select
                name="city"
                onChange={handleChange}
                className={`${getInputClass("city")} bangla-font`}
                defaultValue=""
                disabled={isSubmitting || filteredCities.length === 0}
                required
                aria-invalid={errors.city ? "true" : "false"}
                aria-describedby={errors.city ? "city-error" : undefined}
              >
                <option className="!bangla-font" value="" disabled>
                  {filteredCities.length === 0
                    ? "প্রথমে জেলা নির্বাচন করুন *"
                    : "উপজেলা নির্বাচন করুন *"}
                </option>
                {filteredCities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p
                  id="city-error"
                  className="text-red-500 text-xs mt-1"
                  role="alert"
                >
                  {errors.city}
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <input
                type="text"
                name="postalCode"
                placeholder="পোস্টাল কোড (ঐচ্ছিক)"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className={`${getInputClass("postalCode")} bangla-font`}
                maxLength={10}
                disabled={isSubmitting}
              />
            </div>

            {/* Address */}
            <div>
              <textarea
                name="address"
                placeholder="বিস্তারিত ঠিকানা *"
                onChange={handleChange}
                className={`${getInputClass(
                  "address"
                )} min-h-[80px] resize-none bangla-font`}
                maxLength={500}
                disabled={isSubmitting}
                required
                aria-invalid={errors.address ? "true" : "false"}
                aria-describedby={errors.address ? "address-error" : undefined}
              />
              {errors.address && (
                <p
                  id="address-error"
                  className="text-red-500 text-xs mt-1"
                  role="alert"
                >
                  {errors.address}
                </p>
              )}
            </div>
          </div>
        </div>

        {children}
      </form>

      {/* COD Confirmation Modal */}
      {showCODModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-gray-700 rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl bangla-font font-semibold text-white mb-4">
              ক্যাশ অন ডেলিভারি নিশ্চিত করুন
            </h3>

            {/* Payment Instructions */}
            <div className="bg-yellow-900/20 bangla-font border border-yellow-600 rounded p-4 mb-4">
              <p className="text-yellow-400 bangla-font font-semibold mb-2 text-sm">
                ⚠️ পেমেন্ট পদ্ধতি সম্পর্কে গুরুত্বপূর্ণ তথ্য:
              </p>
              <div className="text-yellow-100 bangla-font text-sm space-y-2">
                <p>
                  <strong>১.</strong> অর্ডার কনফার্ম করার সময় আপনাকে শুধুমাত্র{" "}
                  <strong>ডেলিভারি চার্জ</strong> প্রদান করতে হবে।
                </p>
                <p>
                  <strong>২.</strong> পণ্য হাতে পাওয়ার পর{" "}
                  <strong>বাকি টাকা</strong> ডেলিভারি ম্যানকে প্রদান করবেন।
                </p>
                <p>
                  <strong>৩.</strong> পণ্য চেক করে সন্তুষ্ট হলেই শুধুমাত্র টাকা
                  পরিশোধ করবেন।
                </p>
              </div>
            </div>

            {/* Order Details */}
            <div className="border border-gray-600 rounded p-4 mb-6">
              <p className="text-white mb-3 bangla-font font-semibold">
                অর্ডার বিস্তারিত:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300 bangla-font">
                    প্রোডাক্ট মূল্য:
                  </span>
                  <span className="text-white">{mainPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-300 bangla-font">
                    ডেলিভারি চার্জ:
                  </span>
                  <div className="text-right">
                    <span className="text-white block">
                      {mainPrice(shipOption?.fee || 0)}
                    </span>
                    <span className="text-green-400 bangla-font text-xs">
                      (এখনই প্রদান করতে হবে)
                    </span>
                  </div>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between font-medium">
                  <span className="text-white bangla-font">সর্বমোট:</span>
                  <span className="text-white">
                    {mainPrice(totalPrice + (shipOption?.fee || 0))}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-secondary rounded p-4 mb-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-gray-600">
                  <span className="text-gray-300 bangla-font">
                    এখন পরিশোধ করুন:
                  </span>
                  <span className="text-green-400 font-semibold bangla-font text-lg">
                    {mainPrice(shipOption?.fee || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 bangla-font">
                    পণ্য পাওয়ার পর পরিশোধ:
                  </span>
                  <span className="text-blue-400 font-semibold bangla-font text-lg">
                    {mainPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCODConfirm}
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-gray-200 disabled:bg-gray-600 disabled:cursor-not-allowed text-black py-3 px-4 rounded transition-colors font-medium bangla-font"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
                    প্রসেসিং...
                  </div>
                ) : (
                  `অর্ডার কনফার্ম করুন (${mainPrice(
                    shipOption?.fee || 0
                  )} পে করুন)`
                )}
              </button>

              <button
                onClick={() => setShowCODModal(false)}
                disabled={isSubmitting}
                className="w-full  flex justify-center items-center hover:border-transparent !py-3 !px-4 nav-border new-variable-btn dis  bangla-font"
              >
                বাতিল করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
