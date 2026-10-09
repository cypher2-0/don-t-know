import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { items, storeId, total } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Demo Mode: Mock Order Creation and Payment Verification
    // In production, we'd verify stock levels atomically via Supabase here.

    // Simulate Razorpay or Payment Gateway Delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate Mock Order
    const orderNumber =
      "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Generate Secure Exit QR Token
    // We sign this or hash it in production
    const exitQrToken = `${orderNumber}-VERIFIED-${Date.now()}`;

    return NextResponse.json({
      success: true,
      orderNumber,
      paymentStatus: "SUCCESS",
      exitQrToken,
      total,
      itemsCount: items.length,
      storeId,
    });
  } catch (error) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
