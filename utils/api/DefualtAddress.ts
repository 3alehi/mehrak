import axios from 'axios';
import { getTokenFromCookie } from '../helper/getCooki';

export async function getDefaultAddress(shippingId: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/shipping/defaultAddress`,
      { shipping_id: shippingId },  // Send shipping_id in the request body
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching default address:', error);
    throw new Error('Failed to fetch default address');
  }
}
