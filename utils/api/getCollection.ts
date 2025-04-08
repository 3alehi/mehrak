import axios from 'axios';
import { deleteCookie } from 'cookies-next/client';
import { getTokenFromCookie } from '../helper/getCooki';

export const getProfileCollections = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get(`${API_URL}/profile/collections/me`, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
    });


      return response.data;
    
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching profile collections:', error.response?.data || error.message);
      throw error.response?.data || error;
    } else {
      console.error('Unknown error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
