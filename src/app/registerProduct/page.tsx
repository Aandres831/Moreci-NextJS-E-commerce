"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import axios from "axios";

export default function RegisterProduct() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        description: "",
        quantity: 0,
        size: "",
        available: false,
        price: 0,
        category: "",
        condition: "",
        brand: "",
        color: "",
        tags: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            ...form,
            tags: form.tags.split(",").map(t => t.trim()),
        };

        try {
            await axios.post("/api/registerProduct", productData);

            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white px-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md text-center border border-green-400/40">
                <h1 className="text-3xl font-bold mb-6 text-green-200">
                    Create a new product
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">

                    <div>
                        <label className="block mb-1 text-sm text-green-100">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Product Name"
                            onChange={handleChange}
                            value={form.name}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40 placeholder-green-200 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-green-100">Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Describe your product"
                            onChange={handleChange}
                            value={form.description}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40 placeholder-green-200 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-green-100">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            onChange={handleChange}
                            value={form.quantity}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40 placeholder-green-200 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-green-100">Size</label>
                        <input
                            type="text"
                            name="size"
                            onChange={handleChange}
                            value={form.size}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40 placeholder-green-200 text-white"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-green-100">Available</label>
                        <input
                            type="checkbox"
                            name="available"
                            onChange={handleChange}
                            checked={form.available}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-green-100">Price</label>
                        <input
                            type="number"
                            name="price"
                            onChange={handleChange}
                            value={form.price}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-green-100">Category</label>
                        <input
                            type="text"
                            name="category"
                            onChange={handleChange}
                            value={form.category}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-green-100">Condition</label>
                        <input
                            type="text"
                            name="condition"
                            onChange={handleChange}
                            value={form.condition}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-green-100">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            onChange={handleChange}
                            value={form.brand}
                            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-green-100">Color</label>
                        <input
                            type="text"
                            name="color"
                            onChange={handleChange}
                            value={form.color}
                            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-green-100">Tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            onChange={handleChange}
                            value={form.tags}
                            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
                        />
                    </div>

                    <Button label="Create Product" className="w-full mt-4" />
                </form>

                <div className="mt-6">
                    <Button label="Back to Home" href="/" />
                </div>
            </div>
        </div>
    );
}

