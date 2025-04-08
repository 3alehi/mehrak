import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';

export const againPay = async (id: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.post(
      `${API_URL}/profile/orders/${id}/continue-payment`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
        },
      }
    );

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