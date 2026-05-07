import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const codOrderSchema = z.object({
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
  total: z.number().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const data = codOrderSchema.parse(body);

    const orderId = `LN-COD-${Date.now()}`;

    // TODO: Save order to database, send confirmation email, WhatsApp webhook
    // await sendWhatsAppConfirmation(data.customer.phone, orderId, data.total);
    // await sendOrderConfirmationEmail(data.customer.email, orderId, data.cart);

    console.log("COD Order created:", orderId, "for", data.customer.firstName, data.customer.lastName);

    return NextResponse.json({ orderId, success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    console.error("COD order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
