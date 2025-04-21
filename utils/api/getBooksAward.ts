import axios from "axios";
import { getTokenFromCookie } from "../helper/getCooki";

export async function getBooksAward( page: number) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`, 
      },
      params: {
        page: page,
      },
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

