import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { items, total } = await request.json();

    if (!items || !total) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total.toFixed(2),
              },
            },
          },
          items: items.map((item: any) => ({
            name: item.name.substring(0, 127),
            unit_amount: {
              currency_code: "USD",
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
            sku: item.sku || item.id,
          })),
        },
      ],
    };

    const baseUrl = 'https://api-m.sandbox.paypal.com';

    const response = await fetch(
      `${baseUrl}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: JSON.stringify(orderPayload),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`PayPal API error: ${response.status}`);
    }

    const orderData = await response.json();

    return Response.json({ 
      success: true,
      id: orderData.id 
    });

  } catch (error) {
    return Response.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}