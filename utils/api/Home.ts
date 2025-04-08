import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getHome = async () => {

  try {
    const response = await axios.get(`${API_URL}/home`, {
 
    });
    
   
      return response.data;

    
  } catch (error: any) {
    console.error("Error fetching user data", error);
    throw new Error(error.response?.data?.message || error.message); 
  }
}



