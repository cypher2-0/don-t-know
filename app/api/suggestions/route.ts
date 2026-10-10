import { NextRequest, NextResponse } from 'next/server';
import { getSuggestionsCollection, ProductSuggestionDoc } from '@/lib/mongodb';

// In-memory fallback
const inMemorySuggestions: ProductSuggestionDoc[] = [
  {
    productName: 'Organic Jaggery Powder',
    category: 'Staples',
    notes: 'Please bring 24 Mantra or Conscious Food organic jaggery',
    storeName: 'Indiranagar Main Store',
    userPhone: '+91 98765 43210',
    status: 'reviewing',
    createdAt: new Date(),
  },
];

export async function GET() {
  try {
    const col = await getSuggestionsCollection();
    if (col) {
      const tickets = await col.find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json({ success: true, count: tickets.length, suggestions: tickets });
    }
  } catch (e) {
    console.warn('[MongoDB] Suggestions query fallback:', (e as Error).message);
  }

  return NextResponse.json({
    success: true,
    count: inMemorySuggestions.length,
    suggestions: inMemorySuggestions,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, category, notes, storeName, userPhone } = body;

    if (!productName || !productName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Product name is required for suggestion ticket.' },
        { status: 400 }
      );
    }

    const doc: ProductSuggestionDoc = {
      productName: productName.trim(),
      category: category || 'General',
      notes: notes || '',
      storeName: storeName || 'Indiranagar Store',
      userPhone: userPhone || '',
      status: 'pending',
      createdAt: new Date(),
    };

    try {
      const col = await getSuggestionsCollection();
      if (col) {
        const res = await col.insertOne(doc);
        return NextResponse.json({
          success: true,
          message: 'Product request ticket created in MongoDB for Store Manager + Admin review',
          ticketId: res.insertedId,
          suggestion: doc,
        });
      }
    } catch (e) {
      console.warn('[MongoDB] Direct insert failed, saving in memory:', (e as Error).message);
    }

    inMemorySuggestions.unshift(doc);
    return NextResponse.json({
      success: true,
      message: 'Product request ticket submitted for Store Manager + Admin review',
      ticketId: `in_mem_${Date.now()}`,
      suggestion: doc,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
