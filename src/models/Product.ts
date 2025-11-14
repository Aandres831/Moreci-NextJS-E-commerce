import mongoose, { Schema, models } from "mongoose";

// Defines the structure of a product
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    available: { type: Boolean, required: true },
    category: { type: String, required: true },
    condition: {
        type: String,
        enum: ["new", "like-new", "good", "used", "damaged"],
        required: true
    },
    brand: { type: String },
    color: { type: String },
    tags: [{ type: String }],
    images: [{ type: String }],

}, { timestamps: true });

const Product = models.Product || mongoose.model("Product", ProductSchema);
export default Product;
