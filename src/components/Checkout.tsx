"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

interface CheckoutProps {
    onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
    const { items, getCartTotal, clearCart } = useCart();

    const createOrder = async (): Promise<string> => {
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: items,
                    total: getCartTotal(),
                }),
            });

            const orderData = await response.json();

            if (!response.ok) {
                throw new Error(orderData.error || "Error creating order");
            }

            return orderData.id;
        } catch (error) {
            toast.error("Error creating order");
            throw error;
        }
    };

    const onApprove = async (data: { orderID: string }) => {
        try {
            const response = await fetch("/api/checkout/approve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderID: data.orderID,
                    items: items,
                }),
            });

            const approvalData = await response.json();

            if (response.ok) {
                toast.success("Payment completed successfully!");
                clearCart();
                onClose();
            } else {
                throw new Error(approvalData.error || "Payment failed");
            }
        } catch (error) {
            toast.error("Payment failed");
            console.error("Payment error:", error);
        }
    };

    const onError = (err: any) => {
        toast.error("Payment error occurred");
        console.error("PayPal error:", err);
    };

    return (
        <div className="p-6">
            <h3 className="text-xl font-bold text-green-200 mb-4">Complete Your Purchase</h3>

            <div className="bg-white/10 p-4 rounded-lg mb-4">
                <div className="flex justify-between text-green-200 mb-2">
                    <span>Total:</span>
                    <span className="font-bold">${getCartTotal().toFixed(2)}</span>
                </div>
            </div>

            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "paypal"
                }}
            />
        </div>
    );
}