"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import CustomSelect from "@/components/SelectCustom";
import LogoutButton from "@/components/LogoutButton";
import { productSchema, imageSchema } from "@/lib/validationSchemas";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ------------------------------
  // HANDLE INPUTS
  // ------------------------------
  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // ------------------------------
  // HANDLE IMAGE INPUT
  // ------------------------------
  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Validar imagen
      await imageSchema.validate({ imageFile: file });
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      
      // Limpiar error de imagen
      if (errors.imageFile) {
        setErrors(prev => ({ ...prev, imageFile: "" }));
      }
    } catch (error: any) {
      toast.error(error.message);
      e.target.value = ""; // Limpiar input file
    }
  };

  // ------------------------------
  // VALIDAR FORMULARIO
  // ------------------------------
  const validateForm = async (): Promise<boolean> => {
    try {
      // Validar datos del formulario
      await productSchema.validate(form, { abortEarly: false });
      
      // Validar imagen (opcional pero recomendado)
      if (!imageFile) {
        toast.warning("Recomendamos agregar una imagen del producto");
      }
      
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      
      error.inner.forEach((err: any) => {
        if (err.path) {
          newErrors[err.path] = err.message;
        }
      });
      
      setErrors(newErrors);
      
      // Mostrar primer error como toast
      if (error.inner[0]) {
        toast.error(error.inner[0].message);
      }
      
      return false;
    }
  };

  // ------------------------------
  // FORM SUBMIT
  // ------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validar formulario
      const isValid = await validateForm();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      let uploadedImageUrl = "";

      // 1️⃣ Subir imagen a Cloudinary
      if (imageFile) {
        toast.info("Subiendo imagen...");
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await axios.post("/api/uploadImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedImageUrl = uploadRes.data.url;
        toast.success("Imagen subida exitosamente!");
      }

      // 2️⃣ Crear datos del producto
      const productData = {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        image: uploadedImageUrl,
        images: uploadedImageUrl ? [uploadedImageUrl] : [],
        stock: form.quantity,
        condition: form.condition.toLowerCase(),
      };

      // 3️⃣ Guardar en DB con Axios
      toast.info("Creando producto...");
      await axios.post("/api/registerProduct", productData);
      
      toast.success("¡Producto creado exitosamente!");
      
      // Reset form
      setForm({
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
      setImageFile(null);
      setImagePreview(null);
      
      setTimeout(() => router.push("/"), 2000);
      
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || "Error creando producto. Verifica tus datos.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función helper para clases de input con errores
  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full px-4 py-2 rounded-lg bg-white/20 border placeholder-green-200 text-white";
    return errors[fieldName] 
      ? `${baseClass} border-red-500 bg-red-500/10` 
      : `${baseClass} border-green-400/40`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-4xl text-center border border-green-400/40">
        <h1 className="text-3xl font-bold mb-6 text-green-200">
          Create a New Product
        </h1>

        {/* FORMULARIO - GRID PRINCIPAL DE 2 COLUMNAS */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
        >
          {/* 1. FILA DE SKU */}
          <div>
            <label className="block mb-1 text-sm text-green-100">SKU</label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              className={getInputClassName("sku")}
              placeholder="Unique SKU"
            />
            {errors.sku && (
              <p className="text-red-300 text-sm mt-1">{errors.sku}</p>
            )}
          </div>

          {/* 1. FILA DE IMAGEN */}
          <div>
            <label className="block mb-1 text-sm text-green-100">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full text-green-100"
            />
            {errors.imageFile && (
              <p className="text-red-300 text-sm mt-1">{errors.imageFile}</p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                className="mt-3 w-40 h-40 object-cover rounded-lg border border-green-400/40"
                alt="Preview"
              />
            )}
          </div>

          {/* 2. FILA DE NAME - Ocupa 2 columnas */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm text-green-100">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={getInputClassName("name")}
            />
            {errors.name && (
              <p className="text-red-300 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* 2. FILA DE DESCRIPTION - Ocupa 2 columnas */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm text-green-100">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className={`${getInputClassName("description")} min-h-[80px]`}
            />
            {errors.description && (
              <p className="text-red-300 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* 3. SECCIÓN DE NÚMEROS Y DISPONIBILIDAD */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                className={getInputClassName("quantity")}
              />
              {errors.quantity && (
                <p className="text-red-300 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>
            {/* PRICE */}
            <div>
              <label className="block mb-1 text-sm text-green-100">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                step="0.01"
                className={getInputClassName("price")}
              />
              {errors.price && (
                <p className="text-red-300 text-sm mt-1">{errors.price}</p>
              )}
            </div>
            {/* AVAILABLE */}
            <div className="flex items-end pb-2">
              <label className="text-sm text-green-100 mr-2">Available</label>
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-green-600 bg-white/20 border-green-400/40 rounded"
              />
            </div>
          </div>

          {/* 4. SECCIÓN DE PROPIEDADES */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* SIZE */}
            <div>
              <label className="block mb-1 text-sm text-green-100">Size</label>
              <input
                type="text"
                name="size"
                value={form.size}
                onChange={handleChange}
                className={getInputClassName("size")}
              />
              {errors.size && (
                <p className="text-red-300 text-sm mt-1">{errors.size}</p>
              )}
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
                className={getInputClassName("category")}
              />
              {errors.category && (
                <p className="text-red-300 text-sm mt-1">{errors.category}</p>
              )}
            </div>
            {/* CONDITION */}
            <div>
              <CustomSelect
                label="Condition"
                name="condition"
                value={form.condition}
                onChange={handleChange}
                options={["new", "like-new", "good", "used", "damaged"]}
                error={errors.condition}
              />
            </div>
          </div>

          {/* 5. SECCIÓN DE BRAND Y COLOR */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* BRAND */}
            <div>
              <label className="block mb-1 text-sm text-green-100">Brand</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className={getInputClassName("brand")}
              />
              {errors.brand && (
                <p className="text-red-300 text-sm mt-1">{errors.brand}</p>
              )}
            </div>
            {/* COLOR */}
            <div>
              <label className="block mb-1 text-sm text-green-100">Color</label>
              <input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                className={getInputClassName("color")}
              />
              {errors.color && (
                <p className="text-red-300 text-sm mt-1">{errors.color}</p>
              )}
            </div>
          </div>

          {/* 6. TAGS - Ocupa 2 columnas */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm text-green-100">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="summer, sport, men"
              className={getInputClassName("tags")}
            />
            {errors.tags && (
              <p className="text-red-300 text-sm mt-1">{errors.tags}</p>
            )}
          </div>

          {/* SUBMIT BUTTON - Ocupa 2 columnas */}
          <div className="md:col-span-2">
            <Button 
              label={isSubmitting ? "Creating Product..." : "Create Product"} 
              className="w-full mt-4"
              disabled={isSubmitting}
            />
          </div>
        </form>

        {/* BOTONES ADICIONALES */}
        <div className="mt-6 flex justify-center space-x-4">
          <Button label="Back to Home" href="/" />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
