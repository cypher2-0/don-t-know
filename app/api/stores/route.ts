import { NextResponse } from "next/server";
import { stores } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");

  // If we have GPS coordinates, calculate distance (Demo haversine approximation)
  const storesWithDistance = stores.map((store) => {
    let distance = 0;
    if (lat && lng && store.lat && store.lng) {
      // Basic euclidean for demo sorting
      distance =
        Math.sqrt(Math.pow(lat - store.lat, 2) + Math.pow(lng - store.lng, 2)) *
        111; // Approx km
    }
    return {
      ...store,
      distance: distance > 0 ? `${distance.toFixed(1)} km away` : "1.2 km away",
    };
  });

  if (lat && lng) {
    storesWithDistance.sort(
      (a, b) => parseFloat(a.distance) - parseFloat(b.distance),
    );
  }

  return NextResponse.json({ stores: storesWithDistance });
}
