import { getTokenFromCookie } from "../helper/getCooki";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProduct = async (id: string) => {
  try {
    // خواندن توکن از کوکی‌های سرور

    const res = await fetch(`${API_URL}/books/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // جلوگیری از کش‌شدن داده‌ها
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
