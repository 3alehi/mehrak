import axios from "axios";

export async function getBooksCategory(id: string, page: number,sort:string = "id" , award?:string,related?:string ,creators?:string,producer?:string,collections?:string) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books?sort=${sort}`, {
 
      params: {
        "filter[related_categories]": id,
        page,
        sort,
        ...(award && { "filter[awards.id]": award }),
        ...(related && { "filter[related_categories]=": related }),
        ...(creators && { "filter[related_creators]=": creators }),
        ...(producer && { "filter[producer_id]=": producer }),
        ...(collections && { "filter[collections.id]=": collections }),

      }
      
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

