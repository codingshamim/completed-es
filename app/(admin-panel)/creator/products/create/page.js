"use client";

import { createProduct } from "@/app/actions/product.action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReusableImage from "@/app/_components/ReusableImage";
import Image from "next/image";
import BasicInformation from "../_components/BasicInformation";
import Categories from "./_components/Categories";

export default function ProductCreatePage() {
  const router = useRouter();

  const sizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    slug: "",
    thumbnail: "",
    category: [],
    sizeDetails: [], // NEW
    ability: [""],
    gallery: [""],
    status: "active",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "title":
        if (!value.trim()) {
          newErrors.title = "Product title is required";
        } else delete newErrors.title;
        break;
      case "description":
        if (!value.trim()) {
          newErrors.description = "Description is required";
        } else delete newErrors.description;
        break;
      case "price":
        if (!value || parseFloat(value) <= 0) {
          newErrors.price = "Valid price is required";
        } else delete newErrors.price;
        break;
      case "thumbnail":
        if (!value.trim()) {
          newErrors.thumbnail = "Thumbnail is required";
        } else delete newErrors.thumbnail;
        break;
      case "discount":
        if (value && (value < 0 || value > 100)) {
          newErrors.discount = "Discount must be 0-100";
        } else delete newErrors.discount;
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    validateField(field, value);

    if (field === "title") {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

      setFormData((prev) => ({ ...prev, slug }));
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
    setFormData((p) => ({
      ...p,
      [field]: p[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((p) => ({ ...p, [field]: [...p[field], ""] }));
    if (field === "gallery") setGalleryPreviews((prev) => [...prev, ""]);
  };

  const removeArrayItem = (field, index) => {
    setFormData((p) => ({
      ...p,
      [field]: p[field].filter((_, i) => i !== index),
    }));
    if (field === "gallery")
      setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((p) => ({
      ...p,
      [field]: p[field].includes(value)
        ? p[field].filter((i) => i !== value)
        : [...p[field], value],
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

    if (!formData.title || !formData.description || !formData.price) {
      setSubmitError("Please fill all required fields.");
      return;
    }

    if (formData.sizeDetails.some((s) => !s.size || !s.stock)) {
      setSubmitError("All size rows must have a size and stock.");
      return;
    }

    setIsSaving(true);

    try {
      const cleaned = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        discount: Number(formData.discount) || 0,
        slug: formData.slug.trim(),
        thumbnail: formData.thumbnail.trim(),
        gallery: formData.gallery.filter((x) => x.trim()),
        category: formData.category,
        ability: formData.ability.filter((x) => x.trim()),
        status: formData.status,
        stock: formData.sizeDetails.reduce(
          (acc, s) => acc + Number(s.stock),
          100
        ),
        sizes: formData.sizeDetails.map((s) => ({
          size: s.size,
          stock: Number(s.stock),
          measurements: {
            chest: Number(s.measurements.chest),
            length: Number(s.measurements.length),
            sleeve: Number(s.measurements.sleeve),
          },
        })),
      };

      const result = await createProduct(cleaned);

      if (result.error) {
        setSubmitError(result.message);
        return;
      }

      router.push(`/tshirt/${result.slug}`);
    } catch (err) {
      setSubmitError("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Product
            </h1>
            <p className="text-gray-400">Add a new product to your inventory</p>
          </div>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-xl">
            <p className="text-red-400">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-6">
              <BasicInformation
                handleInputChange={handleInputChange}
                formData={formData}
                errors={errors}
              />

              {/* --------------------------- SIZE DETAILS UI ---------------------------- */}
              <div className="backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6">
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

                    <button
                      type="button"
                      onClick={() => removeSizeDetail(index)}
                      className="mt-4 text-red-400 hover:text-red-300"
                    >
                      Remove Size
                    </button>
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

              {/* CATEGORIES + FEATURES */}
              <Categories
                formData={formData}
                handleCheckboxChange={handleCheckboxChange}
              />

              {/* FEATURES */}
              <div className="bg-transparent backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Product Features
                </h3>

                {formData.ability.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 mb-3">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("ability", index, e.target.value)
                      }
                      className="flex-1 bg-transparent border border-gray-600 rounded px-4 py-3 text-white"
                      placeholder="Enter feature"
                    />
                    {formData.ability.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("ability", index)}
                        className="text-red-400"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addArrayItem("ability")}
                  className="text-blue-400"
                >
                  + Add Feature
                </button>
              </div>
            </div>

            {/* -------------------- IMAGES + SETTINGS -------------------- */}
            <div className="space-y-6">
              {/* THUMBNAIL */}
              <div className="backdrop-blur-xl p-6 border border-gray-700/50 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Product Images
                </h3>

                <label className="block text-sm text-gray-300 mb-2">
                  Thumbnail Image URL *
                </label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => handleThumbnailChange(e.target.value)}
                  className="w-full bg-transparent border border-gray-600 text-white p-3 rounded"
                />

                {thumbnailPreview && (
                  <div className="mt-3">
                    <ReusableImage
                      src={thumbnailPreview}
                      width={200}
                      height={200}
                      alt="Thumbnail"
                    />
                  </div>
                )}
              </div>

              {/* GALLERY */}
              <div className="backdrop-blur-xl p-6 border border-gray-700/50 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Gallery Images
                </h3>

                {formData.gallery.map((url, index) => (
                  <div key={index} className="mb-3">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) =>
                        handleGalleryChange(index, e.target.value)
                      }
                      className="w-full bg-transparent border border-gray-600 text-white p-2 rounded"
                      placeholder="Image URL"
                    />

                    {galleryPreviews[index] && (
                      <div className="mt-2">
                        <ReusableImage
                          src={galleryPreviews[index]}
                          width={200}
                          height={200}
                          alt="Gallery"
                        />
                      </div>
                    )}

                    {formData.gallery.length > 1 && (
                      <button
                        type="button"
                        className="text-red-400 mt-1"
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
                  className="text-blue-400"
                >
                  + Add More Images
                </button>
              </div>

              {/* SEO */}
              <div className="backdrop-blur-xl p-6 border border-gray-700/50 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-6">
                  SEO Settings
                </h3>

                <label className="block text-sm text-gray-300 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  className="w-full bg-transparent border border-gray-600 text-white p-3 rounded"
                />

                <p className="text-gray-500 mt-2 text-sm">
                  URL: /product/{formData.slug || "product-slug"}
                </p>
              </div>

              {/* STATUS */}
              <div className="backdrop-blur-xl p-6 border border-gray-700/50 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Product Status
                </h3>

                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full bg-transparent border border-gray-600 text-white p-3 rounded"
                >
                  <option className="bg-black" value="active">
                    Active
                  </option>
                  <option className="bg-black" value="inactive">
                    Inactive
                  </option>
                  <option className="bg-black" value="draft">
                    Draft
                  </option>
                </select>
              </div>

              {/* SAVE BUTTON */}
              <div className="backdrop-blur-xl p-6 border border-gray-700/50 rounded-2xl">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
                >
                  {isSaving ? "Creating..." : "Create Product"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
