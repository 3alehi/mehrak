import axios from "axios";
import { getTokenFromCookie } from "../helper/getCooki";

export async function fetchBooksSearch(q: string, page: number, sort: string ) {
  try {
    const params: any = {
      page: page,
      sort: sort, // مقدار مرتب‌سازی را اضافه کردیم
    };

    // مقدار جستجو را در فیلتر قرار می‌دهیم
    params["filter[title]"] = decodeURIComponent(q);

  

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}
