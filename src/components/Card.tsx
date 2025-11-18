"use client";

import React from "react";

export default function ProductCard({ product }: { product: any }) {
    return (
        <div
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border"
        >
            <div className="w-full aspect-square bg-gray-100">
                <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>

                <p className="text-sm text-gray-600 mt-1 mb-3">
                    {product.description || "No description"}
                </p>

                <p className="text-xl font-bold">${product.price}</p>

                <div className="flex justify-between mt-3">
                    <span className="text-xs text-gray-500">
                        Stock: {product.stock}
                    </span>

                    <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                        {product.category}
                    </span>
                </div>
            </div>
        </div>
    );
}
