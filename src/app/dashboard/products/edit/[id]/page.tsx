"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productService } from "@/services/product";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import CustomSelect from "@/components/SelectCustom";
import Link from "next/link";

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        sku: "",
        available: true,
        condition: "new",
        brand: "",
        color: "",
        size: "",
        tags: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${params.id}`);
                const data = await response.json();

                if (data.error) {
                    toast.error(data.error);
                    router.push("/dashboard/products");
                    return;
                }

                setForm({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price || 0,
                    stock: data.stock || data.quantity || 0,
                    category: data.category || "",
                    sku: data.sku || "",
                    available: data.available !== false,
                    condition: data.condition || "new",
                    brand: data.brand || "",
                    color: data.color || "",
                    size: data.size || "",
                    tags: Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "",
                });
            } catch (error) {
                toast.error("Error loading product");
                router.push("/dashboard/products");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        try {
            const productData = {
                ...form,
                tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
                quantity: form.stock, // Mantener compatibilidad
            };

            await productService.updateProduct(params.id as string, productData);
            toast.success("Product updated successfully");
            router.push("/dashboard/products");
        } catch (error) {
            toast.error("Error updating product");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, type, value, checked } = e.target as HTMLInputElement;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const getInputClassName = (fieldName: string) => {
        const baseClass = "w-full px-4 py-2 rounded-lg bg-white/10 border placeholder-green-200 text-white";
        return errors[fieldName]
            ? `${baseClass} border-red-500 bg-red-500/10`
            : `${baseClass} border-green-400/40`;
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
                <p className="mt-4 text-green-200">Loading product...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Edit Product</h2>
                    <p className="text-green-200">Update product details</p>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                    <Link
                        href="/dashboard/products"
                        className="px-4 py-2 border border-green-300 text-green-100 rounded-lg hover:bg-white/10 transition text-sm"
                    >
                        ← Back to Products
                    </Link>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-green-300 text-green-100 rounded-lg hover:bg-white/10 transition text-sm"
                    >
                        🏠 Home
                    </Link>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 text-green-100 font-medium">Product Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className={getInputClassName("name")}
                            placeholder="Enter product name"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 text-green-100 font-medium">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className={`${getInputClassName("description")} resize-none`}
                            placeholder="Enter product description"
                        />
                    </div>

                    {/* Price & Stock */}
                    <div>
                        <label className="block mb-2 text-green-100 font-medium">Price *</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            step="0.01"
                            min="0"
                            className={getInputClassName("price")}
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-green-100 font-medium">Stock *</label>
                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            required
                            min="0"
                            className={getInputClassName("stock")}
                            placeholder="0"
                        />
                    </div>

                    {/* Category & SKU */}
                    <div>
                        <label className="block mb-2 text-green-100 font-medium">Category *</label>
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                            className={getInputClassName("category")}
                            placeholder="e.g., Electronics"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-green-100 font-medium">SKU</label>
                        <input
                            type="text"
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            className={getInputClassName("sku")}
                            placeholder="Product SKU"
                        />
                    </div>

                    {/* Condition & Status */}
                    <div>
                        <label className="block mb-2 text-green-100 font-medium">Condition</label>
                        <CustomSelect
                            name="condition"
                            value={form.condition}
                            onChange={handleChange}
                            options={["new", "like-new", "good", "used", "damaged"]}
                            label="Condition"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="available"
                            id="available"
                            checked={form.available}
                            onChange={handleChange}
                            className="mr-3 h-5 w-5 text-green-600 bg-white/20 border-green-400/40 rounded"
                        />
                        <label htmlFor="available" className="text-green-100">
                            Available for purchase
                        </label>
                    </div>

                    {/* Brand & Color */}
                    <div>
                        <label className="block mb-2 text-green-100 font-medium">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            className={getInputClassName("brand")}
                            placeholder="Brand name"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-green-100 font-medium">Color</label>
                        <input
                            type="text"
                            name="color"
                            value={form.color}
                            onChange={handleChange}
                            className={getInputClassName("color")}
                            placeholder="Product color"
                        />
                    </div>

                    {/* Size & Tags */}
                    <div>
                        <label className="block mb-2 text-green-100 font-medium">Size</label>
                        <input
                            type="text"
                            name="size"
                            value={form.size}
                            onChange={handleChange}
                            className={getInputClassName("size")}
                            placeholder="Product size"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-green-100 font-medium">Tags</label>
                        <input
                            type="text"
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            className={getInputClassName("tags")}
                            placeholder="tag1, tag2, tag3"
                        />
                        <p className="text-green-200 text-xs mt-2">Separate tags with commas</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-green-400/20">
                    <Button
                        type="submit"
                        label={saving ? "Saving Changes..." : "Save Changes"}
                        disabled={saving}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    />
                    <Button
                        label="Cancel"
                        href="/dashboard/products"
                        className="flex-1 border-2 border-green-300 text-green-100 hover:bg-white/10"
                    />
                    <Button
                        label="Delete Product"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this product?")) {
                                productService.deleteProduct(params.id as string)
                                    .then(() => {
                                        toast.success("Product deleted");
                                        router.push("/dashboard/products");
                                    })
                                    .catch(() => toast.error("Error deleting product"));
                            }
                        }}
                        className="flex-1 bg-red-500 hover:bg-red-600"
                    />
                </div>
            </form>
        </div>
    );
}