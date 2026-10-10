import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'grocerai';
const apiKey = process.env.CLOUDINARY_API_KEY || '';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '';

// Configure Cloudinary SDK
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export { cloudinary };

/**
 * Returns a high-resolution Cloudinary or optimized barcode image URL for a given barcode
 */
export function getCloudinaryBarcodeUrl(barcode: string, options?: { width?: number; height?: number }): string {
  const width = options?.width || 300;
  const height = options?.height || 100;

  // If Cloudinary credentials are fully provided, use Cloudinary fetch/upload transformation
  if (apiKey && apiSecret && cloudName !== 'grocerai') {
    return cloudinary.url(`grocerai/barcodes/${barcode}`, {
      width,
      height,
      crop: 'fit',
      format: 'png',
      secure: true,
    });
  }

  // High-availability CDN barcode image URL (EAN-13 / Code-128 standard)
  return `https://barcodeapi.org/api/128/${encodeURIComponent(barcode)}`;
}

/**
 * Upload a barcode image or buffer to Cloudinary
 */
export async function uploadBarcodeToCloudinary(
  barcode: string,
  imageBufferOrBase64: string
): Promise<{ success: boolean; url: string; publicId: string }> {
  try {
    if (!apiKey || !apiSecret) {
      // Fallback URL if credentials not provided
      const fallbackUrl = getCloudinaryBarcodeUrl(barcode);
      return { success: true, url: fallbackUrl, publicId: `grocerai/barcodes/${barcode}` };
    }

    const result = await cloudinary.uploader.upload(imageBufferOrBase64, {
      folder: 'grocerai/barcodes',
      public_id: barcode,
      overwrite: true,
      resource_type: 'image',
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('[Cloudinary] Upload barcode error:', (error as Error).message);
    return {
      success: false,
      url: getCloudinaryBarcodeUrl(barcode),
      publicId: `grocerai/barcodes/${barcode}`,
    };
  }
}

/**
 * Upload a catalog product photo to Cloudinary
 */
export async function uploadProductImageToCloudinary(
  fileOrUrl: string,
  productName: string
): Promise<{ success: boolean; url: string }> {
  try {
    if (!apiKey || !apiSecret) {
      return { success: true, url: fileOrUrl };
    }

    const cleanName = productName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const result = await cloudinary.uploader.upload(fileOrUrl, {
      folder: 'grocerai/products',
      public_id: cleanName,
      overwrite: true,
      resource_type: 'image',
    });

    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error('[Cloudinary] Upload product image error:', (error as Error).message);
    return { success: false, url: fileOrUrl };
  }
}
