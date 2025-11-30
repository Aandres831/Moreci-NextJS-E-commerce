"use client";

import Image from "next/image";
import React from "react";

export default function ProductCard({ product, onAddToCart }: { product: any; onAddToCart?: () => void }) {

    const imageUrl =
        product?.images?.[0] && product.images[0].startsWith("http")
            ? product.images[0]
            : "/placeholder.png";

    return (
        <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 bg-white transform hover:-translate-y-1">
            {/* IMAGE */}
            <div className="w-full aspect-square bg-gray-100">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-900">
                    {product.name}
                </h2>

                <p className="text-sm mt-1 mb-3 text-gray-600 line-clamp-2">
                    {product.description || "No description"}
                </p>

                <p className="text-xl font-bold text-emerald-700">
                    ${product.price}
                </p>

                <div className="flex justify-between mt-3 items-center">
                    <span className="text-xs text-gray-500">
                        Stock: {product.stock || product.quantity}
                    </span>

                    <span className="text-xs px-2 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800">
                        {product.category}
                    </span>
                </div>

                {/* BOTÓN AGREGAR AL CARRITO */}
                {onAddToCart && (
                    <button
                        onClick={onAddToCart}
                        className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-200 font-medium"
                    >
                        Agregar al Carrito
                    </button>
                )}
            </div>
        </div>
    );
}