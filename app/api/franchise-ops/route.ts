import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get('store')

    const filePath = path.join(process.cwd(), 'data', 'franchise_ops', 'aggregated_franchise_ops.json')
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Franchise ops data not found' }, { status: 404 })
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    if (storeId) {
      const store = data.stores.find(
        (s: any) => s.storeId.toLowerCase() === storeId.toLowerCase() || s.location.toLowerCase() === storeId.toLowerCase()
      )
      if (!store) {
        return NextResponse.json({ error: 'Store not found' }, { status: 404 })
      }
      return NextResponse.json({ store })
    }

    return NextResponse.json({
      success: true,
      meta: {
        totalStores: data.totalStores,
        totalProducts: data.totalProducts,
        totalSalesRows: data.totalSalesRows,
        totalWastageRows: data.totalWastageRows,
        snapshotDate: '2026-11-16 (08:30 AM)',
      },
      stores: data.stores,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read franchise ops data' }, { status: 500 })
  }
}
