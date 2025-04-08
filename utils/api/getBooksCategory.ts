import axios from "axios";

export async function getBooksCategory(id: string, page: number) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
 
      params: {
        "filter[related_categories]": id,
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

