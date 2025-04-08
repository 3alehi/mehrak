import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const applyDiscount = async (code: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart/discount`, 
      {
        code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getTokenFromCookie()}`,
        },
      }
    );

    return response.data;
  } catch {
    throw new Error('Failed to apply discount');
  }
};
