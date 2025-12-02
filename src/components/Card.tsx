"use client";

import { useState } from "react";

export default function ProductCard({ product, onAddToCart }: { product: any; onAddToCart?: () => void }) {
    const [isHovered, setIsHovered] = useState(false);

    const imageUrl = product?.images?.[0] && product.images[0].startsWith("http")
        ? product.images[0]
        : "/placeholder.png";

    return (
        <div 
            className="group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 bg-white transform hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* IMAGE CONTAINER */}
            <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className={`object-cover w-full h-full transition-transform duration-500 ${
                        isHovered ? 'scale-110' : 'scale-100'
                    }`}
                />
                
                {/* CATEGORY BADGE */}
                <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 text-xs font-bold bg-emerald-500 text-white rounded-full shadow-lg">
                        {product.category || "General"}
                    </span>
                </div>

                {/* STOCK BADGE */}
                <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
                        (product.stock || product.quantity) > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {product.stock || product.quantity > 0 ? `${product.stock || product.quantity} in stock` : 'Out of stock'}
                    </span>
                </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="p-5">
                <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-emerald-700 transition">
                    {product.name}
                </h2>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                    {product.description || "No description available"}
                </p>

                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-2xl font-bold text-emerald-700">
                            ${Number(product.price).toFixed(2)}
                        </p>
                        {product.sku && (
                            <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
                        )}
                    </div>
                    
                    {product.condition && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            {product.condition}
                        </span>
                    )}
                </div>

                {/* ADD TO CART BUTTON */}
                {onAddToCart && (
                    <button
                        onClick={onAddToCart}
                        disabled={(product.stock || product.quantity) <= 0}
                        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 shadow-md ${
                            (product.stock || product.quantity) <= 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 hover:shadow-lg'
                        }`}
                    >
                        {(product.stock || product.quantity) <= 0 
                            ? 'Out of Stock' 
                            : 'Add to Cart'}
                    </button>
                )}
            </div>
        </div>
    );
}