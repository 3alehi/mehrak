import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`, {
   
    });
   
      return response.data;

    
    
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Error fetching addresses';
    throw new Error(errorMessage);
  }
  
};
