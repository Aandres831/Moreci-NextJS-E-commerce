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
import styles from "./product.module.css";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Estado de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        totalPages: 1,
        totalProducts: 0,
        hasNext: false,
        hasPrev: false
    });

    const { addItem } = useCart();

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
            <div className={`p-6 ${styles.wrapper}`}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <CartButton onPress={() => setIsCartOpen(true)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );

    if (error)
        return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className={`p-6 ${styles.wrapper}`}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Products</h1>
                    <p className="text-green-200 mt-1">
                        Mostrando {products.length} de {pagination.totalProducts} productos
                    </p>
                </div>
                <CartButton onPress={() => setIsCartOpen(true)} />
            </div>

            {products.length === 0 ? (
                <p className="text-center text-green-200 py-8 text-lg">
                    No products found.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {products.map((prod) => (
                            <ProductCard
                                key={prod._id}
                                product={prod}
                                onAddToCart={() => handleAddToCart(prod)}
                            />
                        ))}
                    </div>

                    {/* Paginación */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}

            <br />
            <Button className="buttonHome" label="Back to Home" href="/" />

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
}