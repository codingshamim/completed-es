"use client";

import { updateProductAction } from "@/app/actions/product.action";
import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import getProductBySlug from "@/app/backend/queries/getProductBySlug";
import ReusableImage from "@/app/_components/ReusableImage";

import BasicInformation from "../../../products/_components/BasicInformation";
import Categories from "../../../products/create/_components/Categories";

export default function ProductEditPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [productNotFound, setProductNotFound] = useState(false);

  const resolvedParams = use(params);

  const sizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    slug: "",
    thumbnail: "",
    category: [],
    sizeDetails: [], // Changed from sizes to sizeDetails
    ability: [""],
    gallery: [""],
    status: "active",
  });

  const [originalSlug, setOriginalSlug] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

        // Transform sizes to sizeDetails format
        const sizeDetails =
          product.sizes && product.sizes.length > 0
            ? product.sizes.map((s) => ({
                size: s.size || "",
                stock: s.stock?.toString() || "",
                measurements: {
                  chest: s.measurements?.chest?.toString() || "",
                  length: s.measurements?.length?.toString() || "",
                  sleeve: s.measurements?.sleeve?.toString() || "",
                },
              }))
            : [
                {
                  size: "",
                  stock: "",
                  measurements: { chest: "", length: "", sleeve: "" },
                },
              ];

        setFormData({
          title: product.title || "",
          description: product.description || "",
          price: product.price?.toString() || "",
          discount: product.discount?.toString() || "",
          slug: product.slug || "",
          thumbnail: product.thumbnail || "",
          category: product.category || [],
          sizeDetails: sizeDetails,
          ability:
            product.ability && product.ability.length > 0
              ? product.ability
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
      case "thumbnail":
        if (!value.trim()) {
          newErrors.thumbnail = "Product thumbnail is required";
        } else {
          delete newErrors.thumbnail;
        }
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

    // Auto-generate slug from title
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

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const addSizeDetail = () => {
    setFormData((p) => ({
      ...p,
      sizeDetails: [
        ...p.sizeDetails,
        {
          size: "",
          stock: "",
          measurements: { chest: "", length: "", sleeve: "" },
        },
      ],
    }));
  };

  const updateSizeDetail = (index, field, value) => {
    const updated = [...formData.sizeDetails];
    updated[index][field] = value;
    setFormData((p) => ({ ...p, sizeDetails: updated }));
  };

  const updateMeasurement = (index, field, value) => {
    const updated = [...formData.sizeDetails];
    updated[index].measurements[field] = value;
    setFormData((p) => ({ ...p, sizeDetails: updated }));
  };

  const removeSizeDetail = (index) => {
    const updated = formData.sizeDetails.filter((_, i) => i !== index);
    setFormData((p) => ({ ...p, sizeDetails: updated }));
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
    } catch {
      return string.startsWith("/");
    }
  };

  const handleThumbnailChange = (value) => {
    handleInputChange("thumbnail", value);
    setThumbnailPreview(isValidUrl(value) ? value : "");
  };

  const handleGalleryChange = (index, value) => {
    handleArrayChange("gallery", index, value);

    const previews = [...galleryPreviews];
    previews[index] = isValidUrl(value) ? value : "";
    setGalleryPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    // Validate required fields
    const requiredFields = ["title", "description", "price", "thumbnail"];
    const fieldErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]?.toString().trim()) {
        fieldErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    // Validate size details
    if (formData.sizeDetails.some((s) => !s.size || !s.stock)) {
      setSubmitError("All size rows must have a size and stock.");
      return;
    }

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
        slug: formData.slug.trim(),
        thumbnail: formData.thumbnail.trim(),
        category: formData.category,
        ability: formData.ability.filter((ability) => ability.trim()),
        gallery: formData.gallery.filter((url) => url.trim()),
        status: formData.status,
        stock: formData.sizeDetails.reduce(
          (acc, s) => acc + Number(s.stock),
          0
        ),
        sizes: formData.sizeDetails.map((s) => ({
          size: s.size,
          stock: Number(s.stock),
          measurements: {
            chest: Number(s.measurements.chest) || 0,
            length: Number(s.measurements.length) || 0,
            sleeve: Number(s.measurements.sleeve) || 0,
          },
        })),
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
            The product you're looking for doesn't exist or has been removed.
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

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-6">
              {/* Basic Information */}
              <BasicInformation
                handleInputChange={handleInputChange}
                formData={formData}
                errors={errors}
              />

              {/* Size Details */}
              <div className="backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Product Sizes (Dynamic)
                </h3>

                {formData.sizeDetails.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-700 p-4 rounded-xl mb-4"
                  >
                    {/* Size dropdown */}
                    <label className="block text-sm text-gray-300 mb-1">
                      Size
                    </label>
                    <select
                      value={item.size}
                      onChange={(e) =>
                        updateSizeDetail(index, "size", e.target.value)
                      }
                      className="w-full bg-transparent border border-gray-600 text-white p-2 rounded mb-3"
                    >
                      <option className="bg-black" value="">
                        Select Size
                      </option>
                      {sizeOptions.map((s) => (
                        <option className="bg-black" key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    {/* Stock */}
                    <label className="block text-sm text-gray-300 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={item.stock}
                      onChange={(e) =>
                        updateSizeDetail(index, "stock", e.target.value)
                      }
                      className="w-full bg-transparent border border-gray-600 text-white p-2 rounded mb-3"
                    />

                    {/* Measurements */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">
                          Chest
                        </label>
                        <input
                          type="number"
                          value={item.measurements.chest}
                          onChange={(e) =>
                            updateMeasurement(index, "chest", e.target.value)
                          }
                          className="w-full bg-transparent border border-gray-600 text-white p-2 rounded"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">
                          Length
                        </label>
                        <input
                          type="number"
                          value={item.measurements.length}
                          onChange={(e) =>
                            updateMeasurement(index, "length", e.target.value)
                          }
                          className="w-full bg-transparent border border-gray-600 text-white p-2 rounded"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">
                          Sleeve
                        </label>
                        <input
                          type="number"
                          value={item.measurements.sleeve}
                          onChange={(e) =>
                            updateMeasurement(index, "sleeve", e.target.value)
                          }
                          className="w-full bg-transparent border border-gray-600 text-white p-2 rounded"
                        />
                      </div>
                    </div>

                    {formData.sizeDetails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeDetail(index)}
                        className="mt-4 text-red-400 hover:text-red-300"
                      >
                        Remove Size
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSizeDetail}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                >
                  + Add Size
                </button>
              </div>

              {/* Categories */}
              <Categories
                formData={formData}
                handleCheckboxChange={handleCheckboxChange}
              />

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
                          ✕
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addArrayItem("ability")}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 py-2 transition-colors duration-200"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Images & Settings */}
            <div className="space-y-6">
              {/* Product Images */}
              <div className="backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Product Images
                </h3>

                <div className="space-y-6">
                  {/* Thumbnail */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Thumbnail Image URL *
                    </label>
                    <input
                      type="text"
                      value={formData.thumbnail}
                      onChange={(e) => handleThumbnailChange(e.target.value)}
                      className={`w-full bg-transparent border ${
                        errors.thumbnail ? "border-red-500" : "border-gray-600"
                      } rounded-sm px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter image URL"
                    />
                    {errors.thumbnail && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.thumbnail}
                      </p>
                    )}

                    {thumbnailPreview && (
                      <div className="mt-3 relative group">
                        <ReusableImage
                          width={200}
                          height={200}
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full border-2 border-gray-600 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setThumbnailPreview("");
                            handleInputChange("thumbnail", "");
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Gallery */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Gallery Images
                    </label>

                    {formData.gallery.map((url, index) => (
                      <div key={index} className="mb-3">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) =>
                            handleGalleryChange(index, e.target.value)
                          }
                          className="w-full bg-transparent border border-gray-600 text-white p-2 rounded mb-2"
                          placeholder="Image URL"
                        />

                        {galleryPreviews[index] && (
                          <div className="relative group mb-2">
                            <ReusableImage
                              src={galleryPreviews[index]}
                              width={200}
                              height={200}
                              alt="Gallery"
                              className="w-full border border-gray-600 rounded"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newPreviews = [...galleryPreviews];
                                newPreviews.splice(index, 1);
                                setGalleryPreviews(newPreviews);
                                removeArrayItem("gallery", index);
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                          </div>
                        )}

                        {formData.gallery.length > 1 && (
                          <button
                            type="button"
                            className="text-red-400 text-sm"
                            onClick={() => removeArrayItem("gallery", index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addArrayItem("gallery")}
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                    >
                      + Add More Images
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
              <div className="backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
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
