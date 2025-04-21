// lib/fetchProductsWithCache.ts
let cachedData: any = null;
let lastFetched: number | null = null;
const FOUR_DAYS_IN_MS = 4 * 24 * 60 * 60 * 1000;

export async function fetchProductsWithCache() {
  const now = Date.now();

  if (cachedData && lastFetched && now - lastFetched < FOUR_DAYS_IN_MS) {
    return cachedData;
  }

  const res = await fetch("https://mehra.liara.run/api/v1/filters/products");
  const data = await res.json();

  cachedData = data;
  lastFetched = now;

  return data;
}
