import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { orderID } = await request.json();

        if (!orderID) {
        return Response.json(
            { error: "Order ID is required" },
            { status: 400 }
        );
        }

        const baseUrl = process.env.PAYPAL_ENV === 'production' 
        ? 'https://api-m.paypal.com' 
        : 'https://api-m.sandbox.paypal.com';

        const response = await fetch(
        `${baseUrl}/v2/checkout/orders/${orderID}/capture`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
                `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
            ).toString("base64")}`,
            },
        }
        );

        if (!response.ok) {
        const errorData = await response.text();
        console.error('PayPal capture error:', errorData);
        throw new Error(`PayPal capture error: ${response.status}`);
        }

        const captureData = await response.json();

        if (captureData.status === "COMPLETED") {
        return Response.json({ 
            success: true, 
            order: captureData 
        });
        } else {
        return Response.json(
            { error: "Payment not completed", status: captureData.status },
            { status: 400 }
        );
        }
    } catch (error: any) {
        console.error("Approval error:", error);
        return Response.json(
        { error: "Payment failed: " + error.message },
        { status: 500 }
        );
    }
}