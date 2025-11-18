"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/Button";
import CustomSelect from "@/components/SelectCustom";

export default function RegisterProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    sku: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    size: "",
    available: false,
    category: "",
    condition: "new",
    brand: "",
    color: "",
    tags: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ------------------------------
  //    HANDLE INPUTS
  // ------------------------------
  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ------------------------------
  //   HANDLE IMAGE INPUT
  // ------------------------------
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ------------------------------
  //   FORM SUBMIT
  // ------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      let uploadedImageUrl = "";

      // 1️⃣ Subir imagen a Cloudinary
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");

        const uploadData = await uploadRes.json();
        uploadedImageUrl = uploadData.url; // URL FINAL
      }

      // 2️⃣ Preparar datos del producto
      const productData = {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        images: uploadedImageUrl ? [uploadedImageUrl] : [],
        image: uploadedImageUrl, // si tu schema usa "image" en vez de "images"
        condition: form.condition.toLowerCase(),
        stock: form.quantity, // tu backend usa stock
      };

      // 3️⃣ Enviar producto
      await axios.post("/api/registerProduct", productData);

      setSuccessMsg("Product created successfully!");

      // Reset
      setTimeout(() => router.push("/"), 1500);
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMsg("Error creating product. Check your data.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md text-center border border-green-400/40">
        <h1 className="text-3xl font-bold mb-6 text-green-200">
          Create a New Product
        </h1>

        {errorMsg && (
          <p className="bg-red-500/40 text-red-200 p-2 rounded mb-3">
            {errorMsg}
          </p>
        )}

        {successMsg && (
          <p className="bg-green-500/40 text-green-200 p-2 rounded mb-3">
            {successMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* SKU */}
          <div>
            <label className="block mb-1 text-sm text-green-100">SKU</label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40 placeholder-green-200 text-white"
              placeholder="Unique SKU"
            />
          </div>

          {/* IMAGE FILE */}
          <div>
            <label className="block mb-1 text-sm text-green-100">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                className="mt-3 w-40 h-40 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* NAME */}
          <div>
            <label className="block mb-1 text-sm text-green-100">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-1 text-sm text-green-100">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
            />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="block mb-1 text-sm text-green-100">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
            />
          </div>

          {/* SIZE */}
          <div>
            <label className="block mb-1 text-sm text-green-100">Size</label>
            <input
              type="text"
              name="size"
              value={form.size}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
            />
          </div>

          {/* AVAILABLE */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-green-100">Available</label>
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="block mb-1 text-sm text-green-100">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-1 text-sm text-green-100">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
            />
          </div>

          {/* CONDITION */}
          <CustomSelect
            label="Condition"
            name="condition"
            value={form.condition}
            onChange={handleChange}
            options={["new", "like-new", "good", "used", "damaged"]}
          />

          {/* BRAND */}
          <div>
            <label className="block mb-1 text-sm text-green-100">Brand</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
            />
          </div>

          {/* COLOR */}
          <div>
            <label className="block mb-1 text-sm text-green-100">Color</label>
            <input
              type="text"
              name="color"
              value={form.color}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
            />
          </div>

          {/* TAGS */}
          <div>
            <label className="block mb-1 text-sm text-green-100">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="summer, sport, men"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40"
            />
          </div>

          {/* SUBMIT */}
          <Button label="Create Product" className="w-full mt-4" />
        </form>

        <div className="mt-6">
          <Button label="Back to Home" href="/" />
        </div>
      </div>
    </div>
  );
}
