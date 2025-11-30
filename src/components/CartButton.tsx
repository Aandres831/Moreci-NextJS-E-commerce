"use client";
import { useCart } from "@/context/CartContext";

interface CartButtonProps {
    onPress: () => void;
}

export default function CartButton({ onPress }: CartButtonProps) {
    const { getCartItemsCount } = useCart();
    const itemCount = getCartItemsCount();

    return (
        <button
            onClick={onPress}
            className="relative px-6 py-2 bg-white/20 border border-green-400/40 text-green-200 rounded-lg hover:bg-white/30 transition flex items-center gap-2"
        >
            🛒 Carrito
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold border border-red-300">
                    {itemCount}
                </span>
            )}
        </button>
    );
}