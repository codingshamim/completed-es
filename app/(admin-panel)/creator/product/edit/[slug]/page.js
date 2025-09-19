"use client";

import { updateProductAction } from "@/app/actions/product.action";

import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import getProductBySlug from "@/app/backend/queries/getProductBySlug";
import ReusableImage from "@/app/_components/ReusableImage";

export default function ProductEditPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [productNotFound, setProductNotFound] = useState(false);

  // Unwrap params using React.use()
  const resolvedParams = use(params);

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

  const [originalSlug, setOriginalSlug] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const thumbnailInputRef = useRef(null);
  const galleryInputRefs = useRef([]);

  const categories = [
    "Hoodie",
    "T-Shirt",
    "Jacket",
    "Pants",
    "Accessories",
    "Shoes",
  ];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // Load product data
  useEffect(() => {
    async function loadProduct() {
      try {
        const slug = resolvedParams.slug;

        if (!slug) {
          setProductNotFound(true);
          setLoading(false);
          return;
        }

        const result = await getProductBySlug(slug);

        if (result.error || !result.product) {
          setProductNotFound(true);
          setLoading(false);
          return;
        }

        const product = result.product;
        setOriginalSlug(product.slug);

        // Fix 1: Update the form data initialization (around line 90-95)
        setFormData({
          title: product.title || "",
          description: product.description || "",
          price: product.price?.toString() || "",
          discount: product.discount?.toString() || "",
          stock: product.stock?.toString() || "",
          slug: product.slug || "",
          thumbnail: product.thumbnail || "",
          category: product.category || [],
          sizes: product.sizes || [],
          ability:
            product.ability && product.ability.length > 0
              ? product.ability // Remove .title access since ability is array of strings
              : [""],
          gallery:
            product.gallery && product.gallery.length > 0
              ? product.gallery
              : [""],
          status: product.status || "active",
        });

        // Set image previews
        if (product.thumbnail) {
          setThumbnailPreview(product.thumbnail);
        }

        if (product.gallery && product.gallery.length > 0) {
          setGalleryPreviews(product.gallery);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading product:", error);
        setProductNotFound(true);
        setLoading(false);
      }
    }

    loadProduct();
  }, [resolvedParams]);

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

    validateField(field, value);

    // Auto-generate slug from title (but only if slug hasn't been manually edited)
    if (field === "title" && formData.slug === originalSlug) {
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

    // Clear success message when form is modified
    if (successMessage) {
      setSuccessMessage("");
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
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
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

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
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

      setTimeout(() => setIsUploading(false), 1000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

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
        ability: formData.ability.filter((ability) => ability.trim()), // Fix: Remove .title
        gallery: formData.gallery.filter((url) => url.trim()),
        status: formData.status,
      };

      const result = await updateProductAction(originalSlug, cleanedData);

      if (result.error) {
        setSubmitError(result.message);
        return;
      }

      setSuccessMessage("Product updated successfully!");

      // Update original slug if it was changed
      if (result.slug && result.slug !== originalSlug) {
        setOriginalSlug(result.slug);
        // Optionally redirect to new URL
        router.push(`/creator/products/edit/${result.slug}`);
      }
    } catch (error) {
      console.error("Update failed:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  // Product not found
  if (productNotFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The product you&#39;re looking for doesn&#39;t exist or has been
            removed.
          </p>
          <button
            onClick={() => router.push("/creator/products")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors duration-200"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Edit Product</h1>
            <p className="text-gray-400">
              Update product information and settings
            </p>
          </div>
          <button
            onClick={() => router.push("/creator/products")}
            className="flex items-center gap-2 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
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
              className="lucide lucide-arrow-left-icon lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Products
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-xl">
            <p className="text-green-400">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-xl">
            <p className="text-red-400">{submitError}</p>
          </div>
        )}

        {/* Rest of the form is identical to create page */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Product Information */}
            <div className="xl:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Product Information
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className={`w-full bg-transparent border ${
                        errors.title ? "border-red-500" : "border-gray-600"
                      } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter product title"
                      required
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={4}
                      className={`w-full bg-transparent border ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-600"
                      } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
                      placeholder="Enter product description"
                      required
                    />
                    {errors.description && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Price (৳) *
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange("price", e.target.value)
                        }
                        className={`w-full bg-transparent border ${
                          errors.price ? "border-red-500" : "border-gray-600"
                        } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        placeholder="0"
                        required
                        min="0"
                        step="0.01"
                      />
                      {errors.price && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) =>
                          handleInputChange("discount", e.target.value)
                        }
                        className={`w-full bg-transparent border ${
                          errors.discount ? "border-red-500" : "border-gray-600"
                        } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                      {errors.discount && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.discount}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Stock *
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          handleInputChange("stock", e.target.value)
                        }
                        className={`w-full bg-transparent border ${
                          errors.stock ? "border-red-500" : "border-gray-600"
                        } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        placeholder="0"
                        required
                        min="0"
                      />
                      {errors.stock && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.stock}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

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

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Categories
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.category.includes(category)}
                            onChange={() =>
                              handleCheckboxChange("category", category)
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-full py-2 px-4 rounded-lg border-2 text-center cursor-pointer transition-all duration-200 ${
                              formData.category.includes(category)
                                ? "border-blue-500 bg-transparent text-blue-400"
                                : "border-gray-600 bg-transparent text-gray-300 hover:border-gray-500"
                            }`}
                          >
                            {category}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
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
                        value={ability} // Fix: Remove .title since ability is a string
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
              <div className="bg-transparent backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
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
                        <div className="relative group">
                          <ReusableImage
                            width={192}
                            height={192}
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="w-full   border-2 border-gray-600"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
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
                          className={`w-full h-48 border-2 border-dashed ${
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
                              <ReusableImage
                                width={192}
                                height={192}
                                src={galleryPreviews[index]}
                                alt={`Gallery ${index + 1}`}
                                className="w-full   border border-gray-600"
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
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-3 shadow-lg"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Updating Product...
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
                      Update Product
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
