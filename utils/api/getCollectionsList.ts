import axios from "axios";

const baseURL =process.env.NEXT_PUBLIC_API_URL; 



export const fetchCollections = async (page: number) => {
  try {
    const response = await axios.get(`${baseURL}/collections`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};
