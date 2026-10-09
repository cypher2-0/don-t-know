import { NextResponse } from "next/server";
import { customerProducts } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const barcode = searchParams.get("barcode");

  if (!barcode) {
    return NextResponse.json({ error: "Barcode is required" }, { status: 400 });
  }

  // Demo mode: Check mock data first
  const product = customerProducts.find(
    (p: any) =>
      p.barcode === barcode ||
      (p.barcode && p.barcode.includes(barcode)) ||
      p.name.toLowerCase().includes(barcode.toLowerCase()),
  );

  if (product) {
    return NextResponse.json({ product });
  }

  // Wait for Supabase Implementation for real lookup
  return NextResponse.json({ error: "Product not found" }, { status: 404 });
}
