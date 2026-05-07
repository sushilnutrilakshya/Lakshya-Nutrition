import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const createOrderSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default("INR"),
  cart: z.array(z.object({
    productId: z.string(),
    variantId: z.string(),
    title: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
  })),
  customer: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const data = createOrderSchema.parse(body);

    // Razorpay order creation
    // In production: import Razorpay and create a real order
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
    const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    if (RAZORPAY_KEY_SECRET != null && RAZORPAY_KEY_ID != null) {
      const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")}`,
        },
        body: JSON.stringify({
          amount: data.amount,
          currency: data.currency,
          receipt: `ln_order_${Date.now()}`,
        }),
      });

      if (!razorpayRes.ok) {
        throw new Error("Razorpay order creation failed");
      }

      const rzpOrder = (await razorpayRes.json()) as { id: string };
      return NextResponse.json({ orderId: rzpOrder.id, success: true });
    }

    // Mock response for development (no Razorpay keys)
    const mockOrderId = `order_LN${Date.now()}`;
    return NextResponse.json({ orderId: mockOrderId, success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
