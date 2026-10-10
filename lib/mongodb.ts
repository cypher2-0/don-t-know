import { MongoClient, Db, Collection } from 'mongodb';

export interface CatalogProductDoc {
  _id?: any;
  name: string;
  size: string;
  price: number;
  category: string;
  color?: string;
  rating?: number;
  discount?: string;
  barcode: string;
  barcodeImageUrl?: string;
  aisle?: string;
  image?: string;
  inStock?: boolean;
  stockQty?: number;
  bestSeller?: boolean;
  buyCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductSuggestionDoc {
  _id?: any;
  productName: string;
  category?: string;
  notes?: string;
  storeName?: string;
  userPhone?: string;
  status: 'pending' | 'reviewing' | 'ordered' | 'stocked';
  createdAt: Date;
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocerai';
const dbName = process.env.MONGODB_DB || 'grocerai';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Global memory cache for Next.js hot reload
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// In-memory fallback if MongoDB server is offline
let inMemoryCatalog: CatalogProductDoc[] = [];

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!process.env.MONGODB_URI && process.env.NODE_ENV !== 'production') {
    // If no URI, attempt local connection with quick timeout
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, { serverSelectionTimeoutMS: 2000 });
        global._mongoClientPromise = client.connect();
      }
      return await global._mongoClientPromise;
    } else {
      if (!clientPromise) {
        client = new MongoClient(uri, { serverSelectionTimeoutMS: 3000 });
        clientPromise = client.connect();
      }
      return await clientPromise;
    }
  } catch (err) {
    console.warn('[MongoDB] Direct connection failed, using fallback in-memory store:', (err as Error).message);
    return null;
  }
}

export async function getDatabase(): Promise<Db | null> {
  const c = await getMongoClient();
  if (!c) return null;
  return c.db(dbName);
}

export async function getCatalogCollection(): Promise<Collection<CatalogProductDoc> | null> {
  const db = await getDatabase();
  if (!db) return null;
  return db.collection<CatalogProductDoc>('catalog');
}

export async function getSuggestionsCollection(): Promise<Collection<ProductSuggestionDoc> | null> {
  const db = await getDatabase();
  if (!db) return null;
  return db.collection<ProductSuggestionDoc>('product_suggestions');
}

/**
 * Seed initial catalog items if the collection is empty
 */
export async function getOrSeedCatalog(defaultProducts: CatalogProductDoc[]): Promise<CatalogProductDoc[]> {
  try {
    const col = await getCatalogCollection();
    if (col) {
      const count = await col.countDocuments();
      if (count === 0 && defaultProducts.length > 0) {
        const docs = defaultProducts.map((p) => ({
          ...p,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
        await col.insertMany(docs);
        return await col.find({}).toArray();
      }
      const existing = await col.find({}).toArray();
      if (existing.length > 0) return existing;
    }
  } catch (e) {
    console.warn('[MongoDB] Collection query warning, using in-memory store:', (e as Error).message);
  }

  // Fallback to in-memory store
  if (inMemoryCatalog.length === 0) {
    inMemoryCatalog = [...defaultProducts];
  }
  return inMemoryCatalog;
}

/**
 * Find product by barcode from MongoDB
 */
export async function findProductByBarcode(barcode: string): Promise<CatalogProductDoc | null> {
  try {
    const col = await getCatalogCollection();
    if (col) {
      const product = await col.findOne({ barcode });
      if (product) return product;
    }
  } catch (e) {
    console.warn('[MongoDB] findProductByBarcode failed:', (e as Error).message);
  }

  return inMemoryCatalog.find((p) => p.barcode === barcode) || null;
}
