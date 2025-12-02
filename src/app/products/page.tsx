"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/product";
import ProductCard from "@/components/Card";
import Button from "@/components/Button";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import CartButton from "@/components/CartButton";
import CartModal from "@/components/CartModal";
import Pagination from "@/components/Pagination";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        totalPages: 1,
        totalProducts: 0,
        hasNext: false,
        hasPrev: false
    });

    const { addItem } = useCart();
    // Removemos useSession temporalmente
    // const { data: session, status } = useSession();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getProducts(currentPage);
                setProducts(data.products || []);
                setPagination(data.pagination || {
                    totalPages: 1,
                    totalProducts: 0,
                    hasNext: false,
                    hasPrev: false
                });
            } catch (err) {
                setError("Error loading products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handleAddToCart = (product: any) => {
        const cartProduct = {
            id: product._id || product.id,
            name: product.name,
            price: product.price,
            image: product.image || product.images?.[0],
            sku: product.sku
        };
        addItem(cartProduct);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading && products.length === 0)
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">Products</h1>
                        <CartButton onPress={() => setIsCartOpen(true)} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 flex items-center justify-center">
                <p className="text-center text-red-300 text-xl">{error}</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600">
            {/* Header con fondo degradado */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 py-8 px-6 shadow-lg">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">Our Collection</h1>
                            <p className="text-green-200">
                                Showing {products.length} of {pagination.totalProducts} amazing products
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 border-2 border-green-300 text-green-100 rounded-lg hover:bg-white/10 transition"
                                >
                                    Login to Shop
                                </Link>
                                <CartButton onPress={() => setIsCartOpen(true)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resto del código igual pero sin secciones condicionales de session */}
            <div className="p-6 max-w-7xl mx-auto">
                {products.length === 0 ? (
                    <div className="text-center py-16 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <p className="text-green-200 text-xl mb-4">No products found.</p>
                    </div>
                ) : (
                    <>
                        {/* Grid de productos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                            {products.map((prod) => (
                                <ProductCard 
                                    key={prod._id} 
                                    product={prod}
                                    onAddToCart={() => handleAddToCart(prod)}
                                />
                            ))}
                        </div>

                        {/* Paginación */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </>
                )}

                {/* CTA para usuarios no logueados */}
                <div className="mt-12 p-8 bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-2xl text-center shadow-xl">
                    <h3 className="text-2xl font-bold text-green-200 mb-4">
                        Ready to make a purchase?
                    </h3>
                    <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                        Create an account to add items to your cart and complete your purchase with secure PayPal checkout.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition shadow-lg"
                        >
                            Create Free Account
                        </Link>
                        <Link
                            href="/login"
                            className="px-6 py-3 border-2 border-green-300 text-green-100 rounded-lg hover:bg-white/10 transition"
                        >
                            Login to Your Account
                        </Link>
                    </div>
                </div>

                {/* Botón volver al inicio */}
                <div className="text-center mt-10">
                    <Button 
                        className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
                        label="Back to Home" 
                        href="/" 
                    />
                </div>
            </div>

            {/* Modal del carrito */}
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}