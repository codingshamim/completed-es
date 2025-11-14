"use client";

import { createProduct } from "@/app/actions/product.action";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ReusableImage from "@/app/_components/ReusableImage";
import Image from "next/image";
import BasicInformation from "../_components/BasicInformation";
import Categories from "./_components/Categories";

export default function ProductCreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    slug: "",
    thumbnail: "",
    category: [],
    sizes: [],
    ability: [""],
    gallery: [""],
    status: "active",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const thumbnailInputRef = useRef(null);
  const galleryInputRefs = useRef([]);

  const sizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "title":
        if (!value.trim()) {
          newErrors.title = "Product title is required";
        } else if (value.length > 200) {
          newErrors.title = "Title must be less than 200 characters";
        } else {
          delete newErrors.title;
        }
        break;
      case "description":
        if (!value.trim()) {
          newErrors.description = "Description is required";
        } else if (value.length > 2000) {
          newErrors.description =
            "Description must be less than 2000 characters";
        } else {
          delete newErrors.description;
        }
        break;
      case "price":
        if (!value || parseFloat(value) <= 0) {
          newErrors.price = "Valid price is required";
        } else {
          delete newErrors.price;
        }
        break;
      case "stock":
        if (!value || parseInt(value) < 0) {
          newErrors.stock = "Valid stock quantity is required";
        } else {
          delete newErrors.stock;
        }
        break;
      case "thumbnail":
        if (!value.trim()) {
          newErrors.thumbnail = "Product thumbnail is required";
        } else {
          delete newErrors.thumbnail;
        }
        break;
      case "discount":
        if (value && (parseFloat(value) < 0 || parseFloat(value) > 100)) {
          newErrors.discount = "Discount must be between 0 and 100";
        } else {
          delete newErrors.discount;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate field
    validateField(field, value);

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData((prev) => ({
        ...prev,
        slug: slug,
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));

    if (field === "gallery") {
      setGalleryPreviews((prev) => [...prev, ""]);
    }
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));

    if (field === "gallery") {
      setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value) // remove
        : [...prev[field], value], // add
    }));
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleImageUpload = async (file, type, index = null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      // Create preview URL
      const mockUrl = URL.createObjectURL(file);

      if (type === "thumbnail") {
        setThumbnailPreview(mockUrl);
        handleInputChange("thumbnail", mockUrl);
      } else if (type === "gallery") {
        const newPreviews = [...galleryPreviews];
        newPreviews[index] = mockUrl;
        setGalleryPreviews(newPreviews);
        handleArrayChange("gallery", index, mockUrl);
      }

      // Simulate upload delay
      setTimeout(() => setIsUploading(false), 1000);
    } catch (error) {
      alert("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "price",
      "stock",
      "thumbnail",
    ];
    const fieldErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]?.toString().trim()) {
        fieldErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSaving(true);

    try {
      // Clean and prepare data
      const cleanedData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        stock: parseInt(formData.stock),
        slug: formData.slug.trim(),
        thumbnail: formData.thumbnail.trim(),
        category: formData.category,
        sizes: formData.sizes,
        ability: formData.ability.filter((ability) => ability.trim()),
        gallery: formData.gallery.filter((url) => url.trim()),
        status: formData.status,
      };

      const result = await createProduct(cleanedData);

      if (result.error) {
        setSubmitError(result.message);
        return;
      }

      // Success - redirect to product page

      if (result.slug) {
        router.push(`/tshirt/${result.slug}`);
      } else {
        // Fallback redirect
        router.push("/shop");
      }
    } catch (error) {
      console.error("Save failed:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Product
            </h1>
            <p className="text-gray-400">Add a new product to your inventory</p>
          </div>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-xl">
            <p className="text-red-400">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Product Information */}
            <div className="xl:col-span-2 space-y-6">
              {/* Basic Information */}
              <BasicInformation
                handleInputChange={handleInputChange}
                formData={formData}
                errors={errors}
              />

              {/* Product Variants */}
              <div className="backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Product Variants
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Sizes
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                      {sizeOptions.map((size) => (
                        <label
                          key={size}
                          className="flex items-center justify-center"
                        >
                          <input
                            type="checkbox"
                            checked={formData.sizes.includes(size)}
                            onChange={() => handleCheckboxChange("sizes", size)}
                            className="sr-only"
                          />
                          <div
                            className={`w-full py-2 px-3 rounded-lg border-2 text-center cursor-pointer transition-all duration-200 ${
                              formData.sizes.includes(size)
                                ? "border-blue-500 bg-transparent text-blue-400"
                                : "border-gray-600 bg-transparent text-gray-300 hover:border-gray-500"
                            }`}
                          >
                            {size}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Categories
                    formData={formData}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                </div>
              </div>

              {/* Product Features */}
              <div className="bg-transparent backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Product Features
                </h3>

                <div className="space-y-3">
                  {formData.ability.map((ability, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={ability}
                        onChange={(e) =>
                          handleArrayChange("ability", index, e.target.value)
                        }
                        placeholder="Enter product feature"
                        className="flex-1 bg-transparent border border-gray-600 rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      {formData.ability.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem("ability", index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-200"
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
                            className="lucide lucide-trash2-icon lucide-trash-2"
                          >
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addArrayItem("ability")}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 py-2 transition-colors duration-200"
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
                      className="lucide lucide-plus-icon lucide-plus"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Images & Settings */}
            <div className="space-y-6">
              {/* Product Images */}
              <div className="bg-transparent backdrop-blur-xl  p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Product Images
                </h3>

                <div className="space-y-6">
                  {/* Thumbnail Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Thumbnail Image *
                    </label>

                    <div className="relative">
                      {thumbnailPreview ? (
                        <div className="relative group overflow-hidden">
                          <ReusableImage
                            width={192}
                            height={192}
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            imageClassName=" w-full h-full"
                            className="  border-gray-600"
                          />
                          <div className="absolute  inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl ">
                            <button
                              type="button"
                              onClick={() => {
                                setThumbnailPreview("");
                                handleInputChange("thumbnail", "");
                              }}
                              className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors duration-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
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
                      ) : (
                        <div
                          onClick={() => thumbnailInputRef.current?.click()}
                          className={`w-full h-[192px] border-2 border-dashed ${
                            errors.thumbnail
                              ? "border-red-500"
                              : "border-gray-600"
                          } rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 hover:bg-gray-700/20 transition-all duration-200`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={32}
                            height={32}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide text-gray-400 mb-2 lucide-upload-icon lucide-upload"
                          >
                            <path d="M12 3v12" />
                            <path d="m17 8-5-5-5 5" />
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          </svg>

                          <p className="text-gray-400 text-sm text-center">
                            {isUploading
                              ? "Uploading..."
                              : "Click to upload thumbnail"}
                          </p>
                        </div>
                      )}

                      <input
                        ref={thumbnailInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, "thumbnail");
                        }}
                        className="hidden"
                      />
                    </div>
                    {errors.thumbnail && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.thumbnail}
                      </p>
                    )}

                    <div className="mt-3">
                      <input
                        type="url"
                        value={formData.thumbnail}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleInputChange("thumbnail", value);
                          if (isValidUrl(value)) {
                            setThumbnailPreview(value);
                          }
                        }}
                        placeholder="Or paste image URL"
                        className={`w-full bg-transparent border ${
                          errors.thumbnail
                            ? "border-red-500"
                            : "border-gray-600"
                        } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      />
                    </div>
                  </div>

                  {/* Gallery Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Gallery Images
                    </label>

                    <div className="space-y-3">
                      {formData.gallery.map((url, index) => (
                        <div key={index} className="space-y-2">
                          {galleryPreviews[index] ? (
                            <div className="relative group">
                              <Image
                                width={192}
                                height={192}
                                src={galleryPreviews[index]}
                                alt={`Gallery ${index + 1}`}
                                className="w-full border border-gray-600"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newPreviews = [...galleryPreviews];
                                  newPreviews.splice(index, 1);
                                  setGalleryPreviews(newPreviews);
                                  removeArrayItem("gallery", index);
                                }}
                                className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={16}
                                  height={16}
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
                          ) : (
                            <div
                              onClick={() =>
                                galleryInputRefs.current[index]?.click()
                              }
                              className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 hover:bg-gray-700/20 transition-all duration-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-image-icon lucide-image"
                              >
                                <rect
                                  width={18}
                                  height={18}
                                  x={3}
                                  y={3}
                                  rx={2}
                                  ry={2}
                                />
                                <circle cx={9} cy={9} r={2} />
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                              </svg>

                              <p className="text-gray-400 text-xs">
                                Upload image
                              </p>
                            </div>
                          )}

                          <input
                            ref={(el) => (galleryInputRefs.current[index] = el)}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file)
                                handleImageUpload(file, "gallery", index);
                            }}
                            className="hidden"
                          />

                          <input
                            type="url"
                            value={url}
                            onChange={(e) => {
                              const value = e.target.value;
                              handleArrayChange("gallery", index, value);
                              if (isValidUrl(value)) {
                                const newPreviews = [...galleryPreviews];
                                newPreviews[index] = value;
                                setGalleryPreviews(newPreviews);
                              }
                            }}
                            placeholder="Or paste image URL"
                            className="w-full bg-transparent border border-gray-600 rounded-sm px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => addArrayItem("gallery")}
                      className="mt-3 flex items-center gap-2 text-blue-400 hover:text-blue-300 py-2 transition-colors duration-200"
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
                        className="lucide lucide-plus-icon lucide-plus"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                      Add More Images
                    </button>
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  SEO Settings
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    name="slug"
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    className="w-full bg-transparent border border-gray-600 rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="product-slug"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    URL: /product/{formData.slug || "product-slug"}
                  </p>
                </div>
              </div>

              {/* Product Status */}
              <div className="backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Product Status
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full bg-transparent border border-gray-600 rounded-sm px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="active" className="bg-gray-800">
                      Active
                    </option>
                    <option value="inactive" className="bg-gray-800">
                      Inactive
                    </option>
                    <option value="draft" className="bg-gray-800">
                      Draft
                    </option>
                  </select>
                </div>
              </div>

              {/* Save Button */}
              <div className="bg-transparent backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <button
                  type="submit"
                  disabled={isSaving || Object.keys(errors).length > 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-3 shadow-lg"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Product...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-save-icon lucide-save"
                      >
                        <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                        <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                        <path d="M7 3v4a1 1 0 0 0 1 1h7" />
                      </svg>
                      Create Product
                    </>
                  )}
                </button>

                {Object.keys(errors).length > 0 && (
                  <p className="text-red-400 text-sm mt-2 text-center">
                    Please fix the errors above before submitting
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
