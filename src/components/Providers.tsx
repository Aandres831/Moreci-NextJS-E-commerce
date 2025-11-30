"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CartProvider } from "@/context/CartContext";

const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    intent: "capture",
};

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PayPalScriptProvider options={paypalOptions}>
            <CartProvider>
                {children}
            </CartProvider>
        </PayPalScriptProvider>
    );
}