"use client";

export default function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border animate-pulse">
            {/* Imagen */}
            <div className="w-full aspect-square bg-gray-200" />

            <div className="p-4">
                {/* Nombre */}
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>

                {/* Descripción */}
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>

                {/* Precio */}
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>

                <div className="flex justify-between mt-3">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/5"></div>
                </div>
            </div>
        </div>
    );
}
