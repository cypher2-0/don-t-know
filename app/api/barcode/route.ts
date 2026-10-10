import { NextRequest, NextResponse } from 'next/server';
import { getCloudinaryBarcodeUrl, uploadBarcodeToCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code') || '8901262010053';
  const width = Number(searchParams.get('w') || 300);
  const height = Number(searchParams.get('h') || 100);

  const barcodeUrl = getCloudinaryBarcodeUrl(code, { width, height });

  return NextResponse.json({
    success: true,
    barcode: code,
    provider: 'Cloudinary CDN',
    imageUrl: barcodeUrl,
    format: 'EAN-13 / Code-128',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { barcode, imageBase64 } = body;

    if (!barcode) {
      return NextResponse.json({ success: false, error: 'Barcode code is required' }, { status: 400 });
    }

    const uploadRes = await uploadBarcodeToCloudinary(barcode, imageBase64 || getCloudinaryBarcodeUrl(barcode));

    return NextResponse.json({
      success: true,
      message: 'Barcode synced to Cloudinary CDN',
      barcode,
      cloudinaryUrl: uploadRes.url,
      publicId: uploadRes.publicId,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
