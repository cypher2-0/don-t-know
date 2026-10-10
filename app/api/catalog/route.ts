import { NextRequest, NextResponse } from 'next/server';
import { getOrSeedCatalog, getCatalogCollection, CatalogProductDoc } from '@/lib/mongodb';
import { defaultCatalog } from '@/lib/default-catalog';
import { getCloudinaryBarcodeUrl } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();
    const barcode = searchParams.get('barcode');

    // Retrieve from MongoDB or seed defaults
    const catalog = await getOrSeedCatalog(defaultCatalog);

    let filtered = [...catalog];

    if (barcode) {
      filtered = filtered.filter((p) => p.barcode === barcode);
    }

    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search) ||
          p.barcode.includes(search)
      );
    }

    // Ensure all products have their Cloudinary barcode image URL attached
    const enriched = filtered.map((p) => ({
      ...p,
      barcodeImageUrl: p.barcodeImageUrl || getCloudinaryBarcodeUrl(p.barcode),
    }));

    return NextResponse.json({
      success: true,
      source: 'mongodb',
      count: enriched.length,
      products: enriched,
    });
  } catch (err) {
    console.error('Error fetching catalog:', err);
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message,
        fallback: defaultCatalog,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.price || !body.barcode) {
      return NextResponse.json(
        { success: false, error: 'Product name, price, and barcode are required.' },
        { status: 400 }
      );
    }

    const newProduct: CatalogProductDoc = {
      name: body.name,
      size: body.size || '1 pc',
      price: Number(body.price),
      category: body.category || 'General',
      color: body.color || 'bg-slate-100',
      rating: body.rating || 4.5,
      barcode: body.barcode,
      barcodeImageUrl: getCloudinaryBarcodeUrl(body.barcode),
      aisle: body.aisle || 'Aisle 1',
      image: body.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80',
      inStock: body.inStock !== false,
      stockQty: Number(body.stockQty || 50),
      bestSeller: Boolean(body.bestSeller),
      buyCount: Number(body.buyCount || 1),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const col = await getCatalogCollection();
    if (col) {
      await col.updateOne(
        { barcode: newProduct.barcode },
        { $set: newProduct },
        { upsert: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product catalog entry saved to MongoDB',
      product: newProduct,
    });
  } catch (err) {
    console.error('Error saving product to catalog:', err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
