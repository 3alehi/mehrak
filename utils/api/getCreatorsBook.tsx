import axios from "axios";
export async function getCreatorsBook(id: string, page: number) {
  try {
    const params: any = {
      page: page,
    };

    params["filter[creators.id]"] = id;

  

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
  
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
