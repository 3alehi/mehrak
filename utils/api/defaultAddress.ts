import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const defaultAddress = async (shippingId:number) => {
  try {
    const response = await axios.post(
      `${API_URL}/shipping/defaultAddress`, 
      {
        shippingId,
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
