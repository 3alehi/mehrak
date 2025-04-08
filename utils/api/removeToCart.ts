import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const removeToCart = async (id:number , quantity:number) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart/remove`, 
      {
        id,
        quantity,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getTokenFromCookie()}`,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    console.error('Error:', err);
    throw new Error('Failed to add item to cart');
  }
};
