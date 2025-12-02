"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { productService } from "@/services/product";
import { toast } from "react-toastify";
import Link from "next/link";

export default function DashboardProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getProducts(1, 100); // Traer muchos productos
            setProducts(data.products || []);
        } catch (error) {
            toast.error("Error loading products");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        setDeletingId(id);
        try {
            await productService.deleteProduct(id);
            toast.success("Product deleted successfully");
            setProducts(products.filter(p => p._id !== id));
        } catch (error) {
            toast.error("Error deleting product");
        } finally {
            setDeletingId(null);
        }
    };

    const handleEdit = (id: string) => {
        router.push(`/dashboard/products/edit/${id}`);
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
                <p className="mt-4 text-green-200">Loading products...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Product Management</h2>
                    <p className="text-green-200">
                        Manage your product catalog ({products.length} products)
                    </p>
                </div>

                <Link
                    href="/dashboard/products/create"
                    className="mt-4 md:mt-0 px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-lg font-medium"
                >
                    ＋ Add New Product
                </Link>
            </div>

            {/* Products Table */}
            <div className="bg-gradient-to-br from-emerald-800/30 to-emerald-900/30 rounded-xl overflow-hidden shadow-lg">
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-green-200 text-lg mb-4">No products found.</p>
                        <Link
                            href="/dashboard/products/create"
                            className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            Create Your First Product
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-emerald-800 to-emerald-900">
                                    <th className="text-left p-4 text-green-200 font-bold text-sm">Image</th>
                                    <th className="text-left p-4 text-green-200 font-bold text-sm">Product</th>
                                    <th className="text-left p-4 text-green-200 font-bold text-sm">Price</th>
                                    <th className="text-left p-4 text-green-200 font-bold text-sm">Stock</th>
                                    <th className="text-left p-4 text-green-200 font-bold text-sm">Category</th>
                                    <th className="text-left p-4 text-green-200 font-bold text-sm">Status</th>
                                    <th className="text-left p-4 text-green-200 font-bold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => {
                                    const imageUrl = product?.images?.[0] || product?.image || "/placeholder.png";

                                    return (
                                        <tr
                                            key={product._id}
                                            className="border-b border-green-400/10 hover:bg-white/5 transition"
                                        >
                                            <td className="p-4">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden border border-green-400/30">
                                                    <img
                                                        src={imageUrl}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-medium text-white text-sm">{product.name}</p>
                                                    <p className="text-xs text-green-200 truncate max-w-xs mt-1">
                                                        {product.description || "No description"}
                                                    </p>
                                                    {product.sku && (
                                                        <p className="text-xs text-green-300 mt-1">SKU: {product.sku}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-green-300 font-bold">${Number(product.price).toFixed(2)}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${(product.stock || product.quantity) > 10
                                                        ? 'bg-green-100 text-green-800'
                                                        : (product.stock || product.quantity) > 0
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.stock || product.quantity} units
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                                                    {product.category || "General"}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.available !== false
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.available !== false ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col sm:flex-row gap-2">
                                                    <button
                                                        onClick={() => handleEdit(product._id)}
                                                        className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        disabled={deletingId === product._id}
                                                        className="px-3 py-1.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50 transition"
                                                    >
                                                        {deletingId === product._id ? 'Deleting...' : 'Delete'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="bg-gradient-to-r from-emerald-700/50 to-emerald-800/50 p-4 rounded-xl text-center border border-green-400/20">
                    <p className="text-2xl font-bold text-white">{products.length}</p>
                    <p className="text-green-200 text-sm">Total Products</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-700/50 to-emerald-800/50 p-4 rounded-xl text-center border border-green-400/20">
                    <p className="text-2xl font-bold text-white">
                        {products.filter(p => p.available !== false).length}
                    </p>
                    <p className="text-green-200 text-sm">Active</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-700/50 to-emerald-800/50 p-4 rounded-xl text-center border border-green-400/20">
                    <p className="text-2xl font-bold text-white">
                        ${products.reduce((sum, p) => sum + (p.price * (p.stock || p.quantity)), 0).toFixed(2)}
                    </p>
                    <p className="text-green-200 text-sm">Inventory Value</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-700/50 to-emerald-800/50 p-4 rounded-xl text-center border border-green-400/20">
                    <p className="text-2xl font-bold text-white">
                        {products.filter(p => (p.stock || p.quantity) === 0).length}
                    </p>
                    <p className="text-green-200 text-sm">Out of Stock</p>
                </div>
            </div>
        </div>
    );
}