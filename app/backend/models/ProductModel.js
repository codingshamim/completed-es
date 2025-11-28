import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      trim: true,
      maxlength: 200,
    },
    description: {
      required: true,
      type: String,
      trim: true,
      maxlength: 2000,
    },
    price: {
      required: true,
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    ability: {
      type: [String],
      default: [],
    },
    user: {
      ref: "users",
      type: Schema.ObjectId,
      required: true,
    },
    thumbnail: {
      required: true,
      type: String,
      trim: true,
    },
    gallery: {
      type: [String],
      default: [],
    },
    stock: {
      required: true,
      type: Number,
      default: 100,
      min: 0,
    },
    category: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    sizes: {
      type: [
        {
          size: {
            type: String,
            enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
          },
          stock: { type: Number, min: 0, default: 0 },
          measurements: {
            chest: { type: Number, default: 0 },
            length: { type: Number, default: 0 },
            sleeve: { type: Number, default: 0 },
          },
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate SKU before saving
productSchema.pre("save", function (next) {
  if (!this.sku) {
    this.sku = "ES" + Math.floor(Math.random() * 100000);
  }
  next();
});

// Ensure slug is unique
productSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("slug")) {
    let baseSlug = this.slug;
    let counter = 1;

    while (
      await mongoose.models.products.findOne({
        slug: this.slug,
        _id: { $ne: this._id },
      })
    ) {
      this.slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
  next();
});

export const ProductModel =
  mongoose.models.products ?? mongoose.model("products", productSchema);
