import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';

export const fetchAddress = async (id:string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get(`${API_URL}/profile/addresses/${id}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching address:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
