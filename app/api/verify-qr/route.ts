import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { qrToken } = await request.json();

    if (!qrToken) {
      return NextResponse.json({ error: "QR Token missing" }, { status: 400 });
    }

    // Demo Mode Verification
    // A real app would check the Supabase `orders.exit_qr_code` field
    if (qrToken.includes("VERIFIED")) {
      const orderNumber = qrToken.split("-VERIFIED-")[0] || "Unknown";
      return NextResponse.json({
        success: true,
        message: "Order verified successfully.",
        orderNumber,
        status: "VERIFIED",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid or expired QR token" },
      { status: 400 },
    );
  } catch (e) {
    return NextResponse.json({ error: "Failed to verify QR" }, { status: 500 });
  }
}
