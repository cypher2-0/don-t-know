import { NextRequest, NextResponse } from 'next/server';
import { findProductByBarcode } from '@/lib/mongodb';
import { defaultCatalog } from '@/lib/default-catalog';
import { getCloudinaryBarcodeUrl } from '@/lib/cloudinary';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ barcode: string }> }
) {
  try {
    const { barcode } = await params;

    let product = await findProductByBarcode(barcode);

    if (!product) {
      product = defaultCatalog.find((p) => p.barcode === barcode) || null;
    }

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: `No product found for barcode ${barcode} in MongoDB catalog.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        barcodeImageUrl: product.barcodeImageUrl || getCloudinaryBarcodeUrl(product.barcode),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
