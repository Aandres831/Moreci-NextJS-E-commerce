import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    size: {
      type: String,
      required: true,
    },

    available: {
      type: Boolean,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      enum: ["new", "like-new", "good", "used", "damaged"],
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", ProductSchema);
export default Product;
