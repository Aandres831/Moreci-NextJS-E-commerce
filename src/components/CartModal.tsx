"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Checkout from "./Checkout";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    sku?: string;
    quantity: number;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCart();
    const [isCheckout, setIsCheckout] = useState(false);

    const handleCheckout = () => {
        setIsCheckout(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-green-400/40 w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-green-400/40">
                    <h2 className="text-2xl font-bold text-green-200 text-center">
                        {isCheckout ? "Finalizar Compra" : "Tu Carrito de Compras"}
                    </h2>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto max-h-96">
                    {isCheckout ? (
                        <Checkout onClose={() => {
                            setIsCheckout(false);
                            onClose();
                        }} />
                    ) : items.length === 0 ? (
                        <p className="text-center text-green-200 py-8">
                            Tu carrito está vacío
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item: CartItem) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/10 border border-green-400/30 backdrop-blur-sm"
                                >
                                    <img
                                        src={item.image || "/placeholder.png"}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg border border-green-400/40"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-green-100 truncate">{item.name}</h3>
                                        <p className="text-green-300 font-bold">${item.price}</p>
                                        {item.sku && (
                                            <p className="text-xs text-green-200/70">SKU: {item.sku}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1 border border-green-400/40">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-6 h-6 flex items-center justify-center text-green-200 hover:text-white hover:bg-green-600/40 rounded transition"
                                            >
                                                -
                                            </button>
                                            <span className="text-green-100 font-medium min-w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-6 h-6 flex items-center justify-center text-green-200 hover:text-white hover:bg-green-600/40 rounded transition"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="px-3 py-1 bg-red-500/20 text-red-200 border border-red-400/40 rounded-lg hover:bg-red-500/40 transition text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer - Solo mostrar si NO está en checkout y hay items */}
                {!isCheckout && items.length > 0 && (
                    <div className="p-6 border-t border-green-400/40 bg-white/5">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-bold text-green-200">
                                    Total: ${getCartTotal().toFixed(2)}
                                </p>
                                <button
                                    onClick={clearCart}
                                    className="text-sm text-red-300 hover:text-red-200 transition mt-1"
                                >
                                    Vaciar Carrito
                                </button>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 border border-green-400/40 text-green-200 rounded-lg hover:bg-white/10 transition"
                                >
                                    Seguir Comprando
                                </button>
                                <button
                                    onClick={handleCheckout}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay para cerrar */}
            <div
                className="absolute inset-0 -z-10"
                onClick={onClose}
            />
        </div>
    );
}